# API Testing Guide

This guide explains how to properly access and use the API testing tools in the Learningportrait project.

## Why You Might See a 404 Error

If you're encountering a "Whitelabel Error Page" with a 404 status, this typically happens for one of these reasons:

1. **Incorrect URL**: Make sure you're using the correct URL provided by the Vite development server
2. **Development server not running**: The Vite server needs to be running to access these test files
3. **Port conflict**: The server might be using a different port than expected
4. **File not found**: The specific file you're trying to access doesn't exist

## Current Development Server Status

The development server is currently running at: `http://localhost:5175/`

## Available Test Pages

### 1. Simple Test Page
A basic page to verify server functionality
- URL: `http://localhost:5175/simple-test.html`
- Purpose: Confirms the development server is running and serving files correctly

### 2. API Tester Tool
A comprehensive tool for testing the study plan API
- URL: `http://localhost:5175/api-tester.html`
- Features:
  - Test both query and generate study plan endpoints
  - Customizable userId and courseId parameters
  - Detailed logging of requests and responses
  - Error handling and debugging information

## How to Use the API Tester

1. Start the development server if it's not already running:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to: `http://localhost:5175/api-tester.html`

3. Enter valid userId and courseId values in the input fields

4. Click either "测试查询学习计划" or "测试生成学习计划" button

5. View the detailed request and response information in the log area

## Important Notes

- The API tester uses the development API endpoint: `http://localhost:8089`
- Ensure you have a stable internet connection
- The logs will show detailed information about request parameters, headers, and responses
- If you encounter CORS issues, check the browser console for more details

## Troubleshooting Tips

1. **Check the terminal**: The Vite server logs show when files are accessed
2. **Verify file existence**: Make sure the test files are present in the project root directory
3. **Try different browsers**: Some browser extensions can interfere with API requests
4. **Check network settings**: Ensure there are no proxies or firewalls blocking the requests
5. **Inspect browser console**: For more detailed error information

## File Locations

All test files are located in the project root directory:
- `simple-test.html` - Basic server test
- `api-tester.html` - Comprehensive API testing tool

If you need further assistance, please check the server logs and browser console for more detailed error information.