# Test task ​for Front-End Engineer

## Setup

### Clone the repository:
```sh
git clone <repository-url>
```

### Navigate to the project directory:
```sh
cd <project-directory>
```

### Install the dependencies:

```sh
npm install
```

### Setting the environment:
VITE_API=http://fe-test.guardtime.com/documents
Create ```.env``` or ```.env.local``` and set up API URL by setting ```VITE_API``` variable:
```conf
VITE_API=http://api.example.com/documents
```

## Running the Application

```sh
npm start
```
Woild be accessable on ```http://localhost:4173/``` via vite preview.

Or alternatevly for ongoing development run:
```sh
npm run dev
```
Navigate in browser to ```http://localhost:5173/```



## Testing
To run the tests, use the following command:

```sh
npm test
```

## Building
To build the application for production, use the following command:

```sh
npm run build
```
This will create a ```dist``` directory with the compiled assets.
