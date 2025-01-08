---
title: Interviewing at an AI startup | Architecture
slug: interviewing-at-an-ai-startup-architecture
draft: false
ignore: false
topics:
  - ai
  - interview
  - architecture
  - llm
created_at: 2025-01-06T19:58
last_modified: 2025-01-08T16:26
lang: eng
translate: false
translated_to: 
---

I've just finished up the second round of interviewing at an AI startup and figured it was worth sharing the (abbreviated) question and my approach.

I had no idea what to expect going into it. I just knew it would be one-hour "architectural" interview with no code. The third round, if I make it, will be an on-site implementation of the architecture we discussed.

## The prompt

**The interviewers played a scenario:**

"Imagine a client comes by with 1000 documents and drops them on your desk, asking you to categorize them. They give you the number of categories they want alongside one-word that categorizes the documents." 

In our case, we used Amazon Products as our document list (1000 Amazon products) and the category we were interested in as Department Type.

I was given the following prompt 10 minutes prior to the one-hour call. I ran the prompt through ChatGPT to randomize it a bit, but the basis is here:

```
We’re building a feature that uses an LLM and other tools to auto-categorize diverse datasets (e.g., tweets, Amazon products) into semantically meaningful and consistent categories. For example, labels like “MISC_PART” and “MISCELLANEOUS_PART” should not coexist.

The datasets include two fields: ID and TEXT, with TEXT as the focus for categorization. You’ll work with either the full dataset (e.g., CSV) or data arriving row-by-row, so consider how access impacts your approach. Minimal user input should be required, though occasional feedback may improve results.

For the interview, prepare an architecture diagram and discuss challenges in building this feature, focusing on clarity and practical solutions.
```


## The approach


![Diagram of my proposed solution](https://cln.sh/Mgszr44w+)

The assumption is made that the OCR (Optical Character Recognition) has already occurred and I now have 1000 rows of data that contain two fields:

1. ID
2. Text

The interviewer wants to categorize the text based on their department, for example, `electronics`, `clothing`, etc. Adding to each row of data a `category` value:

1. ID
2. Text
3. Category

It was determined I could ask the client to provide a few bits of metadata about the documents. I gathered the information they are interested in, and a hard limit for the number of categories they are interested in:

1. The category name they were interested, in this case we used `department`
2. The number of categories they wished to maintain, in this case we used `5`.

I set these values into variables:

```
CATEGORY_NAME = "department"
NUMBER_OF_CATEGORIES = 5
```

Given these variables, I produced the initial prompt for the LLM with the assumption I passed the LLM 100 documents:

```
Of these documents:

- List every <CATEGORY_NAME> that
you recognize
- Limit to <NUMBER_OF_CATEGORIES> categories
```

And the LLM output structured data, for example:

```
CATEGORY_TYPES = [
    { name: 'clothing' },
    { name: 'electronics' },
    { name: 'toys' },
    { name: 'food' },
    { name: 'books' }
]
```

Now, with our 5 category types extracted from the 100 documents, I decided it's best to run each document individually through another LLM call with the prompt:

```
Given these <CATEGORY_TYPES>, what <CATEGORY_NAME> do you believe this document falls under?
```

This seems to satisfy the requirements. So, I was given an additional question:

"What if a new document is added to the pile that falls under a category that is not in `CATEGORY_TYPES`?"

Occasionally there may be categories that do not contain one of the five
determined types. In this case, compile all of the records with `unknown` and re-run
them through the pipeline we used, potentially expanding and altering the original 5
category types, eventually replacing the unknown value with the newly defined category.

## Conclusion

Overall, I enjoyed it. The team is nice and supportive and the problem was unique and fun. I'm confident I did a decent job, but I don't think I crushed it. I've yet to receive a response since the interview, but I'll try to update this post once I do.

This interview gave me a good idea of what startups are doing for some of their LLM workflows. It's also inspired me to actually implement something like this, because, why not?

I want to see some of the real problems that would need to be solved here - is it as simple as chaining a few ChatGPT calls with, or is there more to it?
