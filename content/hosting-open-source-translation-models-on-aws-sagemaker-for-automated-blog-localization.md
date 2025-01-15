---
title: Hosting Open-Source Translation Models on AWS SageMaker for Automated Blog Localization
slug: hosting-open-source-translation-models-on-aws-sagemaker-for-automated-blog-localization
draft: true
ignore: true
lang: eng
translate: true
translated_to: 
topics:
  - aws
  - sagemaker
  - ai
  - localization
  - i18n
  - huggingface
created_at: 2025-01-14T17:43
last_modified: 2025-01-15T14:14
---

## Introduction

Creating multilingual content is often tedious and expensive. Let’s automate it into our blog's build process!

In this post, we’ll take a deep dive into deploying an open-source text-to-text translation (T2TT) model on AWS SageMaker and seamlessly integrating it into a Nuxt Content blog. Better yet, we’ll automate the workflow through a CI pipeline powered by GitHub Actions.

Using these modern tools, we'll be able to fully automate the internationalization of our blog, enabling it to be read in nearly **100 languages**.

## Why AWS SageMaker?

AWS SageMaker is a leading solution for all-things ML models:

 - Flexibility: Easily host pre-trained models like Hugging Face transformers.
- Scalability: Handles traffic spikes without manual intervention.
- Cost-efficiency: Pay only for what you use.
- Integration with AWS ecosystem: Perfect for end-to-end workflows.
- Developer Experience: Well-documented and easy to use SDK's.

## Setting up the translation model

We'll be using the pre-trained model SeamlessM4T-v2 for our translations. It is a multimodal and multilingual AI translation model built and released by Meta.

SeamlessM4T-v2 supports:

- Speech recognition for nearly 100 languages
- Speech-to-text translation for nearly 100 input and output languages
- Speech-to-speech translation, supporting nearly 100 input languages and 36 (including English) output languages
- Text-to-text translation for nearly 100 languages
- Text-to-speech translation, supporting nearly 100 input languages and 35 (including English) output languages

What I'm interesting in is it's text-to-text translations capabilities. According to my simple *vibe-based* development experience, SeamlessM4T-v2 is the most capable open-source model for the problem we are solving.

### AWS SageMaker permissions

To create an AWS IAM role for your SageMaker application, follow these steps:

#### Step 1: Log in to AWS Management Console

1. Go to the **IAM** service in the AWS Management Console.

#### Step 2: Create a New Role

1. In the IAM dashboard, click on **Roles** in the left-hand menu.
2. Click the **Create Role** button.

#### Step 3: Select the Trusted Entity

1. Choose **AWS Service** as the trusted entity type.
2. Under "Use case," select **SageMaker** and click **Next**.

#### Step 4: Attach Policies

1. Attach the necessary policies to allow SageMaker to access resources like S3 and other AWS services:
	- **AmazonSageMakerFullAccess**: Provides full access to SageMaker features.
2. Click **Next**.

#### Step 5: Name and Review

1. Give your role a meaningful name, e.g., `SageMakerExecutionRole`.
2. Review the details and click **Create Role**.

#### Step 6: Copy the Role ARN

1. Find your new role in the list of roles on the IAM dashboard.
2. Click on the role name to open its details.
3. Copy the **Role ARN** (it will look something like `arn:aws:iam::123456789012:role/SageMakerExecutionRole`).

### Deploying the model

We'll use SageMaker's SDK to deploy the model. At the time of writing this, the Javascript SDK does not support model deployment, so I had to resort to using Python.

SageMaker makes the deployment simple enough to manage within a single script, so delegating this piece of the project to Python is acceptable.

I prefer to use [uv](https://docs.astral.sh/uv/) for my python dependency management. But you are free to use whatever you're most comfortable here.

%% TODO: Use/test with the latest supported version of python %%
```zsh
uv venv --python 3.11.6
source .venv/bin/activate
uv add sagemaker
```

> **Note**: The SageMaker SDK only supports Python versions >= Python 3.9.

One of my favorite parts of the SageMaker's SDK is that it has first-class Hugging Face support. Providing the `HuggingFaceModel` a Hugging Face model ID is enough to define and work with the model within our code.

Then all it takes is a simple `.deploy()` call with our desired instance count and instance type and within a few minutes, our model is online!

```python
from sagemaker.huggingface import HuggingFaceModel

# Define model and environment details
model_id = "facebook/seamless-m4t-v2-large"  # Model ID from Hugging Face
role = "arn:aws:iam::123456789012:role/SageMakerExecutionRole"

# Define the Hugging Face Model
huggingface_model = HuggingFaceModel(
    role=role,
    transformers_version="4.6.1",
    py_version="py37",
    pytorch_version="1.7.1",
    env={
        "HF_MODEL_ID": model_id,
        "HF_TASK": "translation",
    },
)

# Deploy the model
predictor = model.deploy(
    initial_instance_count=1,
    instance_type="ml.g4dn.xlarge",  # Use GPU instance for faster inference
)

# Save the endpoint_name logged here. We will use it in our client.
print(f"Model deployed! Endpoint name: {predictor.endpoint_name}")
```

It's worth browsing the [source code](https://github.com/aws/sagemaker-python-sdk/blob/master/src/sagemaker/huggingface/model.py#L111) and [documentation](https://sagemaker.readthedocs.io/en/stable/frameworks/huggingface/sagemaker.huggingface.html) around the `HuggingFaceModel` class. The snippet I provided is the bare-minimum to get our model online, but it's worth knowing that there are a handful of parameters you can manage within this class instantiation to customize your model's deployment.

## Interacting with the model during Nuxt content build

With our model online, all that is left is to interact with it via our blog's build process. There are a few bits of configuration needed to allow our client to talk to our AWS SageMaker endpoint.

Start by creating your Nuxt app with the required dependencies:

```zsh
npx nuxi@latest init content-app -t content
npx nuxi module add i18n
npm install @aws-sdk/client-sagemaker-runtime
```

### Nuxt config and .env variables

If you didn't get the endpoint name from the print statement, run this command in your terminal and it should output the endpoint name:

```zsh
aws sagemaker list-endpoints --query "Endpoints[].EndpointName" --output table
```

Create a `.env` file to manage the environmental variables we require. In it, store the endpoint name that was logged at the end of our deploy script as well as the region you configured.

```
AWS_ENDPOINT_NAME='huggingface-pytorch-inference-2025-01-14-22-34-04-107'
AWS_REGION='us-west-2'
```

Update your `nuxt.config.ts` file with these env variables. Here's a barebones of example of our nuxt config file so far:

```ts
export default defineNuxtConfig({
    modules: ['@nuxt/content', '@nuxtjs/i18n'],

    runtimeConfig: {
        AWS_ENDPOINT_NAME: process.env.AWS_ENDPOINT_NAME,
        AWS_REGION: process.env.AWS_REGION,
    },

    compatibilityDate: '2025-01-14',
})
```

### Invoking our SageMaker endpoint

```ts
import {
    SageMakerRuntimeClient,
    InvokeEndpointCommand,
} from '@aws-sdk/client-sagemaker-runtime'

export async function invokeSageMakerEndpoint(
    endpointName: string,
    region: string,
    inputText: string,
    srcLang: string,
    targetLang: string
) {
    // Initialize the SageMaker Runtime Client
    const client = new SageMakerRuntimeClient({ region })

    // Create the command to invoke the endpoint
    const command = new InvokeEndpointCommand({
        EndpointName: endpointName,
        Body: JSON.stringify({
            inputs: inputText,
            // These parameter's are specific to the model we are using
            parameters: {
                src_lang: srcLang,
                tgt_lang: targetLang,
            },
        }),
    })

    // Send the command and get the response
    const response = await client.send(command)
	// TODO: Do I need the decoder, or can I just parse the response.body?
    const decodedResponse = JSON.parse(new TextDecoder().decode(response.Body))

    return decodedResponse
}
```

### Hooking into our blog's build hooks

%% TODO: Note/document that model language codes may be different. i.e. nllb-200 requiring eng_Latn %%

```ts
import { invokeSageMakerEndpoint } from '../utils/invokeSageMakerEndpoint'

export default defineNitroPlugin(async nitroApp => {
    const { AWS_ENDPOINT_NAME, AWS_REGION } = useRuntimeConfig()
    const srcLang = 'eng_Latn'
    const targetLang = 'spa_Latn'

    nitroApp.hooks.hook('content:file:beforeParse', async file => {
        // TODO: Write response to file
        const response = await invokeSageMakerEndpoint(
            AWS_ENDPOINT_NAME,
            AWS_REGION,
            file.body,
            srcLang,
            targetLang
        )
    })
})
```

### Saving the translations into localized files


## Deployment

Taking the steps towards automating this entire process through Github Actions.


## Scaling down resources to avoid costs

```zsh
aws sagemaker delete-endpoint --endpoint-name <ENDPOINT_NAME>
```


## Conclusion

