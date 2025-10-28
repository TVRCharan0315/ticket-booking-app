pipeline {
    agent any

    environment {
        DOCKER_IMAGE   = 'ticket-booking-app:latest'
        DOCKER_REPO    = 'tvrcharan0315/ticket-booking-app'
        // Jenkins credentials ID that stores your Docker Hub username & password/token
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials'
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo '📦 Checking out source code...'
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                echo '🏗️ Building Docker image...'
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Test Docker Image') {
            steps {
                echo '🧪 Running basic container test...'
                script {
                    // Run a container in detached mode and then stop it
                    bat '''
                        docker run -d -p 3000:3000 --name temp_test %DOCKER_IMAGE%
                        timeout /t 10
                        docker ps -a
                        docker stop temp_test
                        docker rm temp_test
                    '''
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo '📤 Pushing Docker image to Docker Hub...'
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat '''
                        docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                        docker tag %DOCKER_IMAGE% %DOCKER_REPO%:latest
                        docker push %DOCKER_REPO%:latest
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build, test, and push completed successfully!'
        }
        failure {
            echo '❌ Build or push failed!'
        }
    }
}
