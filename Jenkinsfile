pipeline {
    agent any

    parameters {
        choice(
            name: 'DEPLOY_ENV',
            choices: ['development', 'staging', 'production'],
            description: 'Select the environment'
        )
    }

    stages {

        stage('Build') {
            steps {
                sh '''
                    echo "===== BUILD ====="
                    echo "Application: BookMe"
                    echo "Selected Environment: $DEPLOY_ENV"

                    cd backend
                    npm install
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "===== TEST ====="
                    echo "Testing BookMe for $DEPLOY_ENV environment"

                    cd backend
                    npm test
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    echo "===== DEPLOY ====="
                    echo "Deploying BookMe to $DEPLOY_ENV"
                '''
            }
        }
    }

    post {
        success {
            echo "Pipeline completed successfully"
        }

        failure {
            echo "Pipeline failed"
        }

        always {
            echo "Pipeline execution finished"
        }
    }
}