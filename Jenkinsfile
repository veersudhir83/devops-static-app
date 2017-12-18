#!/usr/bin/env groovy

/**
 * @ Maintainer Sudheer Veeravalli <veersudhir83@gmail.com>
 */

/* Only keep the 20 most recent builds. */
def projectProperties = [
        buildDiscarder(logRotator(artifactDaysToKeepStr: '20', artifactNumToKeepStr: '20', daysToKeepStr: '20', numToKeepStr: '20')),
        disableConcurrentBuilds(),
        pipelineTriggers([pollSCM('H/5 * * * *')])
]

properties(projectProperties)

try {
  node {

    def appName = "devops-static-app"            // main application name
    def appEnv = 'DEV'                           // application environment
    def appClientName = 'devops-static-app'      // application client name
    def appClientExtension = "tar"               // extension of the client artifact
    def artifactoryRepoName = 'DevOps'           // repo name in artifactory

    def buildNumber = env.BUILD_NUMBER           // jenkins build number - used to tag the docker image/container(s)
    def workspaceRoot = env.WORKSPACE            // Job Workspace location

    // Artifactory server id configured in the jenkins along with credentials
    artifactoryServer = Artifactory.server 'Artifactory-OSS-5.4.3'
    def artifactoryPublishInfo

    def uploadWebArtifact = """{
      "files": [
        {
            "pattern": "${workspaceRoot}/repo/Source/Client/Web/${appClientName}.${appClientExtension}",
            "target": "generic-local/Applications/${artifactoryRepoName}/${appName}/app/${buildNumber}/"
        }
      ]
    }"""

    stage('Checkout') {
      timestamps {
        checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/veersudhir83/devops-static-app/']]])
      }
    }

    stage('Deploy on Predix') {
      timestamps {
        try {
          // Code to deploy web application on Predix Cloud
          sh 'cf login -a https://api.system.aws-usw02-pr.ice.predix.io -u sudheer.veeravalli@quest-global.com -p XXXXXX'
          sh 'cf push'
        } catch (exc) {
          error "Failure during Deploy: ${exc}"
        }
      }
    }    
  }
} catch (exc) {
  error "Caught: ${exc}"
}
