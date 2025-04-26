**

                            ╱|、
                          (˚ˎ 。7  
                           |、˜〵          
                          じしˍ,)ノ
**


## Guava Disease Prediction System : 
A Machine Learning (ML) powered web application to detect guava diseases from images using Deep Learning (CNN). The system helps farmers and researchers identify diseases like Anthracnose and Fruit Fly, providing solutions for prevention and treatment.

Tech Stack
1. Frontend: React.js
2. Backend: Flask (Python)
3. Database: Firebase Firestore (will do it later)
4. ML Model: Convolutional Neural Networks (CNN)
5. Deployment: AWS Amplify, GitHub CI/CD


### Clone the Repository : 

1. git clone https://github.com/IamSarTech/Guava_Prediction_System.git 
2. cd Guava_Prediction_System

### Set Up Virtual Environment (For ML Model) : 

1. python3 -m venv venv
2. source venv/bin/activate (for mac/linux)
3. venv\Scripts\activate  (for windows)

### Install Dependencies

pip install -r requirements.txt

### Start Backend

1. cd backend
2. python app.py

### Start Frontend

1. cd frontend
2. npm install
3. npm start


## Dataset & ML Model
### Dataset

The model is trained on a custom dataset of guava images collected from open-source datasets and field research.
It contains images of healthy, Anthracnose-infected, and Fruit Fly-infected guavas.

### ML Model
Architecture: CNN (Convolutional Neural Network)
Framework: TensorFlow & Keras
Training: The model is trained on Google Colab using GPU acceleration
Accuracy: Achieved 90%+ accuracy on test data


## Deployment
The project is hosted on AWS Amplify with a CI/CD pipeline connected to GitHub for automatic deployment on push.


