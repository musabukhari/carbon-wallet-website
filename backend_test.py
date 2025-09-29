import requests
import sys
import json
from datetime import datetime

class CarbonWalletAPITester:
    def __init__(self, base_url="https://sleek-platform.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []
        self.passed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        if headers:
            test_headers.update(headers)
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                if 'application/x-www-form-urlencoded' in test_headers.get('Content-Type', ''):
                    response = requests.post(url, data=data, headers=test_headers, timeout=10)
                else:
                    response = requests.post(url, json=data, headers=test_headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                self.passed_tests.append(f"{name} - Status: {response.status_code}")
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, response.text
            else:
                error_msg = f"Expected {expected_status}, got {response.status_code}"
                self.failed_tests.append(f"{name} - {error_msg}")
                print(f"❌ Failed - {error_msg}")
                try:
                    print(f"   Response: {response.json()}")
                except:
                    print(f"   Response: {response.text}")
                return False, {}

        except Exception as e:
            error_msg = f"Error: {str(e)}"
            self.failed_tests.append(f"{name} - {error_msg}")
            print(f"❌ Failed - {error_msg}")
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test(
            "Root API Endpoint",
            "GET",
            "",
            200
        )
        return success

    def test_login_invalid(self):
        """Test login with invalid credentials"""
        success, response = self.run_test(
            "Login with Invalid Credentials",
            "POST",
            "auth/login",
            401,
            data="username=invalid&password=invalid&grant_type=password",
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        return success

    def test_login_valid(self):
        """Test login with valid credentials and get token"""
        success, response = self.run_test(
            "Login with Valid Credentials",
            "POST",
            "auth/login",
            200,
            data="username=admin&password=carbonwallet&grant_type=password",
            headers={"Content-Type": "application/x-www-form-urlencoded"}
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            print(f"   Token obtained: {self.token[:20]}...")
            return True
        return False

    def test_leads_unauthorized(self):
        """Test accessing leads without token"""
        # Temporarily remove token
        temp_token = self.token
        self.token = None
        success, response = self.run_test(
            "Get Leads Without Authorization",
            "GET",
            "leads",
            401
        )
        # Restore token
        self.token = temp_token
        return success

    def test_create_lead(self):
        """Create a test lead"""
        lead_data = {
            "name": "Test User",
            "email": "test@example.com",
            "company": "Test Company",
            "phone": "+1234567890",
            "country": "US",
            "industry": "Technology",
            "company_size": "50-100",
            "team_size": "10-20",
            "timeline": "Q1 2024",
            "interests": ["carbon tracking", "rewards"],
            "message": "Interested in beta access",
            "source": "website",
            "consent": True
        }
        success, response = self.run_test(
            "Create Lead",
            "POST",
            "leads",
            201,
            data=lead_data
        )
        return response.get('id') if success else None

    def test_get_leads_authorized(self):
        """Test getting leads with authorization"""
        success, response = self.run_test(
            "Get Leads With Authorization",
            "GET",
            "leads",
            200
        )
        if success:
            # Verify response structure
            required_fields = ['items', 'total', 'skip', 'limit']
            if all(field in response for field in required_fields):
                print(f"   Response structure valid: {required_fields}")
                print(f"   Total leads: {response.get('total', 0)}")
                return True
            else:
                print(f"   Missing required fields in response")
                return False
        return False

    def test_get_leads_pagination(self):
        """Test leads pagination"""
        success, response = self.run_test(
            "Get Leads With Pagination",
            "GET",
            "leads?skip=0&limit=5",
            200
        )
        if success:
            if response.get('skip') == 0 and response.get('limit') == 5:
                print(f"   Pagination working: skip={response.get('skip')}, limit={response.get('limit')}")
                return True
            else:
                print(f"   Pagination not working correctly")
                return False
        return False

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Create status check
        status_data = {"client_name": "test_client"}
        success1, response1 = self.run_test(
            "Create Status Check",
            "POST",
            "status",
            200,
            data=status_data
        )
        
        # Get status checks
        success2, response2 = self.run_test(
            "Get Status Checks",
            "GET",
            "status",
            200
        )
        
        return success1 and success2

def main():
    print("🚀 Starting Carbon Wallet API Tests")
    print("=" * 50)
    
    tester = CarbonWalletAPITester()
    
    # Test sequence
    tests = [
        ("Root Endpoint", tester.test_root_endpoint),
        ("Invalid Login", tester.test_login_invalid),
        ("Valid Login", tester.test_login_valid),
        ("Unauthorized Leads Access", tester.test_leads_unauthorized),
        ("Create Lead", tester.test_create_lead),
        ("Authorized Leads Access", tester.test_get_leads_authorized),
        ("Leads Pagination", tester.test_get_leads_pagination),
        ("Status Endpoints", tester.test_status_endpoints),
    ]
    
    for test_name, test_func in tests:
        print(f"\n{'='*20} {test_name} {'='*20}")
        try:
            result = test_func()
            if not result:
                print(f"⚠️  {test_name} failed but continuing...")
        except Exception as e:
            print(f"💥 {test_name} crashed: {str(e)}")
            tester.failed_tests.append(f"{test_name} - Exception: {str(e)}")
    
    # Print final results
    print(f"\n{'='*50}")
    print(f"📊 FINAL RESULTS")
    print(f"{'='*50}")
    print(f"Tests run: {tester.tests_run}")
    print(f"Tests passed: {tester.tests_passed}")
    print(f"Tests failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run*100):.1f}%")
    
    if tester.failed_tests:
        print(f"\n❌ Failed Tests:")
        for failure in tester.failed_tests:
            print(f"   - {failure}")
    
    if tester.passed_tests:
        print(f"\n✅ Passed Tests:")
        for success in tester.passed_tests[:5]:  # Show first 5
            print(f"   - {success}")
        if len(tester.passed_tests) > 5:
            print(f"   ... and {len(tester.passed_tests) - 5} more")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())