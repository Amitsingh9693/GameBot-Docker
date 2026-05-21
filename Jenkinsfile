pipeline {
    agent any

    environment {
        APP_NAME = 'game-recommendation-bot'
    }

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
                    bat "docker build -t ${APP_NAME}-backend:latest ."
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    echo 'Building frontend Docker image...'
                    bat "docker build -t ${APP_NAME}-frontend:latest ."
                }
            }
        }

        stage('Prepare Environment') {
            steps {
                dir('backend') {
                    echo 'Creating .env file...'
                    bat '''
                        @echo off
                        (
                            echo PORT=5000
                            echo MONGODB_URI=mongodb://mongo:27017/game-recommendations
                            echo REDIS_URL=redis://redis:6379
                            echo RAWG_API_KEY=ae1cc50a0ccd4a0da6d2c7da5f14f98f
                        ) > .env
                    '''
                }
            }
        }

        stage('Stop Previous Containers') {
            steps {
                echo 'Stopping and removing existing containers...'
                bat '''
                    docker container rm -f game_bot_mongo || exit /b 0
                    docker container rm -f game_bot_redis || exit /b 0
                    docker container rm -f game_bot_backend || exit /b 0
                    docker container rm -f game_bot_frontend || exit /b 0
                    docker compose down --remove-orphans || exit /b 0
                    docker container prune -f || exit /b 0
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application using Docker Compose...'
                bat 'docker compose up -d --build'
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Cleaning up dangling Docker images...'
                bat 'docker image prune -f'
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