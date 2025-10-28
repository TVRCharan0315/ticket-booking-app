pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        IMAGE_NAME = "ticket-booking-app"
        IMAGE_TAG = "1.0"
        DOCKERHUB_REPO = "${DOCKERHUB_CREDENTIALS_USR}/${IMAGE_NAME}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out source code...'
                git branch: 'develop', url: 'https://github.com/<your-username>/ticket-booking-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Test Docker Image') {
            steps {
                echo 'Testing container...'
                script {
                    sh """
                        docker run -d -p 8080:8080 --name ticket-test ${IMAGE_NAME}:${IMAGE_TAG}
                        sleep 5
                        docker ps | grep ticket-test
                        docker stop ticket-test
                        docker rm ticket-test
                    """
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                script {
                    sh """
                        echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                        docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${DOCKERHUB_REPO}:${IMAGE_TAG}
                        docker push ${DOCKERHUB_REPO}:${IMAGE_TAG}
                    """
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build and push completed successfully!'
        }
        failure {
            echo '❌ Build or push failed!'
        }
    }
}
