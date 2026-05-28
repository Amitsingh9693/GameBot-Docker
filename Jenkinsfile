pipeline {
    agent any

    environment {
        APP_NAME = 'gamebot'
    }
//ASDFGHJ
    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    echo 'Building backend Docker image...'
                    sh "docker build -t ${APP_NAME}-backend:latest ."
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    echo 'Building frontend Docker image...'
                    sh "docker build -t ${APP_NAME}-frontend:latest ."
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application using Docker Compose...'
                sh 'docker-compose up -d --build'
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Cleaning up dangling Docker images...'
                sh 'docker image prune -f'
            }
        }
    }

    post {

        success {
            echo '✅ Pipeline completed successfully!'
        }

        failure {
            echo '❌ Pipeline failed! Please check console logs.'
        }

        always {
            echo 'Pipeline execution finished.'
        }
    }
}