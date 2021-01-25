# Kubernetes (k8s) config files

Those files are the config files for the Kubernetes cluster.

[Kubernetes](https://en.wikipedia.org/wiki/Kubernetes) (k8s) is an open-source container-orchestration system for automating computer application deployment, scaling, and management.

To learn how to use Kubernetes, follow [this tutorial](https://learnk8s.io/deploying-nodejs-kubernetes).

## Table of contents

1. [Installation](#Installation)
2. [Usage](#Usage)
3. [Contributing](#Contributing)
4. [Authors and acknowledgment](#Authors-and-acknowledgment)
5. [License](#License)

## Installation

### Creating a local Kubernetes cluster

There are several ways to create a Kubernetes cluster:

Using a managed Kubernetes service like Google Kubernetes Service (GKE), Azure Kubernetes Service (AKS), or Amazon Elastic Kubernetes Service (EKS).
Installing Kubernetes yourself on cloud or on-premises infrastructure with a Kubernetes installation tool like kubeadm or kops.
Creating a Kubernetes cluster on your local machine with a tool like Minikube, MicroK8s, or k3s
In this section, you are going to use Minikube.

**In this section, you are going to use Minikube.**

Minikube creates a single-node Kubernetes cluster running in a virtual machine.

> A Minikube cluster is only intended for testing purposes, not for production. Later in this course, you will create an Amazon EKS cluster, which is suited for production.

**Before you install Minikube, you have to [install kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/).**

kubectl is the primary Kubernetes CLI — you use it for all interactions with a Kubernetes cluster, no matter how the cluster was created.

**Once kubectl is installed, go on and install Minikube according to the [official documentation](https://kubernetes.io/docs/tasks/tools/install-minikube/).**

> If you're on Windows, you can [follow our handy guide on how to install Minikube on Windows](https://learnk8s.io/blog/installing-docker-and-kubernetes-on-windows/).

With Minikube installed, you can create a cluster as follows:

```bash
minikube start
```

The command creates a virtual machine and installs Kubernetes.

*Starting the virtual machine and cluster may take a couple of minutes, so please be patient!*

When the command completes, you can verify that the cluster is created with:

```bash
kubectl cluster-info
```

You have a fully-functioning Kubernetes cluster on your machine now.

## Usage

Make sure that your Minikube cluster is running:

```bash
minikube status
```

Then submit your resource definitions to Kubernetes with the following command:

```bash
kubectl apply -f k8s
```

This command submits all the YAML files in the `k8s` directory to Kubernetes.

> The `-f` flag accepts either a single filename or a directory. In the latter case, all YAML files in the directory are submitted.

As soon as Kubernetes receives your resources, it creates the Pods.

You can watch your Pods coming alive with:

```bash
kubectl get pods --watch
```

You should see two Pods transitioning from *Pending* to *ContainerCreating* to *Running*.

These Pods correspond to the containers created previously.

*As soon as both Pods are in the Running state, your application is ready.*

You can now access your application through the `service_name` Service.

In Minikube, a Service can be accessed with the following command:

```bash
minikube service service_name --url
```

The command should print the URL of the `service_name` Service.

You can open the URL in a web browser.

**You should see your application.**

Verify that your app works as expected by creating some notes with pictures.

The app should work as it did when you ran it locally with Docker.

*But now it's running on Kubernetes.*

When you're done testing the app, you can remove it from the cluster with the following command:

```bash
kubectl delete -f k8s
```

The command deletes all the resources that were created by `kubectl apply`.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors and acknowledgment

Made by Clément STAUNER, IBM FabLab France, Global Markets, July 2021.

## License

[© Copyright IBM Corporation](https://www.ibm.com/legal/copytrade)
