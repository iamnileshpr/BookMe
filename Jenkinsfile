pipeline {
    agent any
    environment {
    APP_NAME = 'BookMe'
    APP_ENV = 'development'
}

    stages {

        stage('Checkout') {
            steps {
                echo 'Code is already checked out by Jenkins'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    cd backend
                    npm install
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    cd backend
                    npm test
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying BookMe application'
            }
        }

    }
    post {
    success {
        echo 'Pipeline completed successfully'
    }

    failure {
        echo 'Pipeline failed'
    }

    always {
        echo 'Pipeline execution finished'
    }
}
}

