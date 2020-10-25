def LABEL_ID = "questcode-${UUID.randomUUID().toString()}"
podTemplate(
    name: 'questcode', 
    namespace: 'devops', 
    label: LABEL_ID, 
    containers: [
        containerTemplate(alwaysPullImage: false, args: 'cat', command: '/bin/sh -c', envVars: [], image: 'docker', livenessProbe: containerLivenessProbe(execArgs: '', failureThreshold: 0, initialDelaySeconds: 0, periodSeconds: 0, successThreshold: 0, timeoutSeconds: 0), name: 'docker-container', ports: [], privileged: false, resourceLimitCpu: '', resourceLimitMemory: '', resourceRequestCpu: '', resourceRequestMemory: '', shell: null, ttyEnabled: true, workingDir: '/home/jenkins'),
        containerTemplate(args: 'cat', command: '/bin/sh -c', image: 'lachlanevenson/k8s-helm:v2.11.0', name: 'helm-container', ttyEnabled: true)
    ],
    volumes: [hostPathVolume(hostPath: '/var/run/docker.sock', mountPath: '/var/run/docker.sock')], 
) 
{
    def REPOS
    def IMAGE_VERSION
    def IMAGE_POSFIX = ""
    def KUBE_NAMESPACE
    def IMAGE_NAME = "questcode-frontend"
    def ENVIRONMENT
    def GIT_REPOS_URL = "git@gitlab.com:questcodeclass/frontend.git"
    def GIT_BRANCH 
    def HELM_CHART_NAME = "questcode/frontend"
    def HELM_DEPLOY_NAME
    def CHARTMUSEUM_URL = "http://helm-chartmuseum:8080"
    def INGRESS_HOST = "questcode.org"

    // Start Pipeline
    node(LABEL_ID) {
        stage('Checkout') {
            echo 'Iniciando Clone do Repositório'
            REPOS = checkout scm
            GIT_BRANCH = REPOS.GIT_BRANCH
            // Com base na branch, direciona ao ambiente correto
            if(GIT_BRANCH.equals("master")){
                KUBE_NAMESPACE = "prod"
                ENVIRONMENT = "production"
            } else if (GIT_BRANCH.equals("develop")) {
                KUBE_NAMESPACE = "staging"
                ENVIRONMENT = "staging"
                IMAGE_POSFIX = "-RC"
                INGRESS_HOST = "staging.questcode.org"
            } else {
                def error = "Nao existe pipeline para a branch ${GIT_BRANCH}"
                echo error
                throw new Exception(error)
            }
            HELM_DEPLOY_NAME = KUBE_NAMESPACE + "-frontend"
            IMAGE_VERSION = sh returnStdout: true, script: 'sh read-package-version.sh'
            IMAGE_VERSION = IMAGE_VERSION.trim() + IMAGE_POSFIX
        }
        stage('Package') {
            container('docker-container') {
                echo 'Iniciando empacotamento com Docker'
                withCredentials([usernamePassword(credentialsId: 'dockerhub', passwordVariable: 'DOCKER_HUB_PASSWORD', usernameVariable: 'DOCKER_HUB_USER')]) {
                    sh "docker login -u ${DOCKER_HUB_USER} -p ${DOCKER_HUB_PASSWORD}"
                    sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_VERSION} . --build-arg NPM_ENV='${ENVIRONMENT}'"
                    sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_VERSION}"
                }

            }
        }
        stage('Deploy') {
            container('helm-container') {
                echo 'Iniciando Deploy com Helm'
                sh """
                    helm init --client-only
                    helm repo add questcode ${CHARTMUSEUM_URL}
                    helm repo update
                """
                try {
                    sh "helm upgrade --namespace=${KUBE_NAMESPACE} ${HELM_DEPLOY_NAME} ${HELM_CHART_NAME} --set image.tag=${IMAGE_VERSION} --set ingress.hosts[0]=${INGRESS_HOST}"
                } catch(Exception e) {
                    sh "helm install --namespace=${KUBE_NAMESPACE} --name ${HELM_DEPLOY_NAME} ${HELM_CHART_NAME} --set image.tag=${IMAGE_VERSION} --set ingress.hosts[0]=${INGRESS_HOST}"
                }
            }
        }
    } // end of node
}
