from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ValidationError
from typing import List, Optional
import uuid
from datetime import datetime, timedelta
from jose import jwt, JWTError
from pymongo.errors import PyMongoError


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ----- Models -----
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class StatusCheckCreate(BaseModel):
    client_name: str


class Lead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    country: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = None
    team_size: Optional[str] = None
    timeline: Optional[str] = None
    interests: Optional[List[str]] = None
    message: Optional[str] = None
    source: Optional[str] = None
    consent: Optional[bool] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    phone: Optional[str] = None
    country: Optional[str] = None
    industry: Optional[str] = None
    company_size: Optional[str] = None
    team_size: Optional[str] = None
    timeline: Optional[str] = None
    interests: Optional[List[str]] = None
    message: Optional[str] = None
    source: Optional[str] = None
    consent: Optional[bool] = None


class LeadsPage(BaseModel):
    items: List[Lead]
    total: int
    skip: int
    limit: int


# ----- Auth -----
ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES_DEFAULT = 60 * 8
_EPHEMERAL_SECRET = os.urandom(32).hex()
JWT_SECRET = os.environ.get("JWT_SECRET", _EPHEMERAL_SECRET)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=JWT_EXPIRE_MINUTES_DEFAULT))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"


async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        role = payload.get("role", "admin")
        return {"username": username, "role": role}
    except JWTError:
        raise credentials_exception


# ----- Routes -----
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    cleaned = []
    for sc in status_checks:
        sc.pop("_id", None)
        cleaned.append(StatusCheck(**sc))
    return cleaned


@api_router.post("/leads", response_model=Lead, status_code=status.HTTP_201_CREATED)
async def create_lead(lead_input: LeadCreate):
    try:
        lead_obj = Lead(**lead_input.dict())
        await db.leads.insert_one(lead_obj.dict())
        return lead_obj
    except ValidationError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except PyMongoError as dbe:
        logging.exception("DB error on create_lead: %s", dbe)
        logging.exception("Failed to create lead")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create lead")


@api_router.post("/auth/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    admin_user = os.environ.get("ADMIN_USERNAME")
    admin_pass = os.environ.get("ADMIN_PASSWORD")
    if not admin_user or not admin_pass:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Admin credentials not configured")

    if not (form_data.username == admin_user and form_data.password == admin_pass):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")

    token = create_access_token({"sub": admin_user, "role": "admin"})
    return Token(access_token=token)


@api_router.get("/leads", response_model=LeadsPage)
async def list_leads(skip: int = 0, limit: int = 20, user=Depends(get_current_user)):
    try:
        cursor = db.leads.find().sort("created_at", -1).skip(int(skip)).limit(int(limit))
        leads = await cursor.to_list(length=limit)
        cleaned: List[Lead] = []
        for lead in leads:
            lead.pop("_id", None)
            cleaned.append(Lead(**lead))
        total = await db.leads.count_documents({})
        return LeadsPage(items=cleaned, total=total, skip=skip, limit=limit)
    except ValidationError as ve:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(ve))
    except PyMongoError as dbe:
        logging.exception("DB error on list_leads: %s", dbe)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch leads")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
