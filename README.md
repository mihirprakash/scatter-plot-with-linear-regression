Scatter Plot with Linear Regression
This application displays a scatter plot and fits a linear regression line to the data using a server-side API. The user can upload a CSV file containing the data points, and the application will visualize the data points and the fitted line.
Installation
	1	Clone the repository: git clone https://github.com/mihirprakash/scatter-plot-with-linear-regression.git
	2	Install dependencies: npm install
	3	Install dependencies: pip install -r requirements.txt
Usage FrontEnd
	1	Start the server: npm run start
	2	Open http://localhost:3000 in a web browser.
	3	Click the "Upload CSV" button to select a CSV file containing the data points.
	4	Click the "Fit Model" button to fit a linear regression line to the data.
	5	The scatter plot and the fitted line will be displayed on the screen.

Usage Backend
	1	Start the server: uvicorn main:app --reload
	2	Upload data: Send a POST request to http://localhost:8000/data/upload/ with the CSV file containing x,y coordinates in the request body.
	3	Calculate linear regression: Send a GET request to http://localhost:8000/linear_regression. This will fit a linear regression model to the uploaded data and return the model’s slope, intercept, and R-squared value.

API
The application uses a server-side API to fit the linear regression line. The API endpoint is /linear_regression and accepts a POST request with the following parameters:
	•	x: an array of x-coordinates of the data points
	•	y: an array of y-coordinates of the data points
The API returns an object with the following properties:
	•	slope: the slope of the fitted line
	•	intercept: the y-intercept of the fitted line
	•	rSquared: the coefficient of determination (R-squared) of the fitted line

/data/upload/
This endpoint accepts a POST request with a CSV file containing x,y coordinates in the request body. The CSV file should have a header row with the column names "x" and "y", and subsequent rows should contain numerical values for x and y separated by a comma. Example:

Copy code
x,y 1,2 3,4 5,6


Dependencies
	•	react: a JavaScript library for building user interfaces
	•	d3: a JavaScript library for data visualization
	•	axios: a JavaScript library for making HTTP requests
	•	fastapi: python lib for api handling
	•	uvicorn: python server
