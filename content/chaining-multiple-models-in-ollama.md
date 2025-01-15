---
title: Chaining multiple models in Ollama
draft: true
ignore: true
lang: eng
translate: true
translated_to: 
topics: 
created_at: 2025-01-08T21:01
last_modified: 2025-01-08T21:40
---

![](https://cln.sh/LSYZL4Js+)

[Ollama response](https://github.com/ollama/ollama/blob/main/docs/api.md#response)

```ts
export interface OllamaResponse {
    model: string
    created_at: string
    response: string
    done: boolean
    done_reason: string
    context: string
    total_duration: number
    load_duration: number
    prompt_eval_duration: number
    eval_count: number
    eval_duration: number
}
```
