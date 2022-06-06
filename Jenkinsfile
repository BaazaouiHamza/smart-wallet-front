@Library('jenkins-shared-libraries')

def project_url = "https://git.digitus.me/pfe/smart-wallet-front.git"

properties(
    [   
        gitLabConnection('jenkins'),
        buildDiscarder(
            logRotator(
                daysToKeepStr: '60',
                numToKeepStr: '200'
            )
        ),
        disableConcurrentBuilds()
    ]
)    
    
timestamps {
    node(){
        nodePipeline(project_url)
    }
}
