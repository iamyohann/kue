docker_build('kue-ui', './ui')
k8s_yaml('deployment.yaml')
k8s_resource('kue-ui', port_forwards="3000:80")