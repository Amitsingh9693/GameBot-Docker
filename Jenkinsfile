pipeline {
    agent any

    environment {
        // Defines the docker compose command
        DOCKER_COMPOSE = 'docker compose'
        APP_NAME = 'game-recommendation-bot'
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from the Git repository
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    echo 'Building backend Docker image...'
                    sh 'docker build -t ${APP_NAME}-backend:latest .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    echo 'Building frontend Docker image...'
                    sh 'docker build -t ${APP_NAME}-frontend:latest .'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application using Docker Compose...'
                // Brings up mongo, redis, backend, and frontend
                // The --build flag ensures it uses the newly built latest images
                sh '${DOCKER_COMPOSE} up -d --build'
            }
        }
        
        stage('Cleanup') {
            steps {
                echo 'Cleaning up dangling Docker images...'
                // Prune dangling images to free up space after a new build
                sh 'docker image prune -f'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully! The Game Recommendation Bot is deployed and running.'
        }
        failure {
            echo '❌ Pipeline failed! Please check the Jenkins console output for details.'
        }
        always {
            echo 'Pipeline execution finished.'
        }
    }
}
