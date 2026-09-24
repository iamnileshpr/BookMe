pipeline {
    agent  {
    label 'linux'
}

    parameters {
        choice(
            name: 'DEPLOY_ENV',
            choices: ['development', 'staging', 'production'],
            description: 'Select the environment'
        )
    }

    stages {
        stage('Check Agent') {
    steps {
        sh '''
            echo "===== AGENT INFORMATION ====="
            echo "Running on:"
            hostname

            echo "User:"
            whoami

            echo "Workspace:"
            pwd
        '''
    }
}

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

    stage('Credentials Test') {
        steps{
            withCredentials([
                string(
                    credentialsId: 'demo-secret',
                    variable: 'MY_SECRET'
                )
            ]) {
                sh '''
                    echo "===== CREDENTIAL TEST ====="
                    echo "Credential is available"
                    echo "Secret length: ${#MY_SECRET}"
                '''
            }
        }
    }
    

    stage('Deploy') {
    when {
        expression {
            params.DEPLOY_ENV == 'production'
        }
    }

    steps {
         input message: 'Do you want to deploy BookMe to production?', 
         ok: 'Approve Deployment'
        sh '''
            echo "===== DEPLOY ====="
            echo "Deploying BookMe to $DEPLOY_ENV"
        '''
    }
}
stage('Create Artifacts'){
        steps{
            sh '''
            echo "===== CREATE ARTIFACTS ====="
            tar -czf bookme-backend.tar.gz backend
            echo "Artifacts created: bookme-backend.tar.gz"
            ls -lh
            '''
        }
    }
    }

    post {
        success {
            echo "Pipeline completed successfully"

            archiveArtifacts artifacts: 'BookMe-backend.tar.gz',
                         fingerprint: true
        }

        failure {
            echo "Pipeline failed"
        }

        always {
            echo "Pipeline execution finished"
        }
    }
}