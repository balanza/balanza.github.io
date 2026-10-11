---
title: "pi-codetour"
date: 2026-10-11
status: published
---

[pi-codetour](https://github.com/balanza/pi-codetour) is an extension for the [Pi](https://pi.dev) coding agent that I
wrote to help me reasoning on codebases. 

## In a nutshell

While interacting with [Pi](https://pi.dev), it can show a UI through which I can navigate the code we are discussing, with my real full
editor straight from inside the conversation. The UI is a basic tour of the code that the agent composes
with the angle of the discussion we are having. It can overview the codebase, drill down into the building machinery,
or trace the chain of calls from an API request through the actual state transformation.

Given the right context, the tour is composed so that I can navigate the code with a storytelling approach that
reflects the subject matter.

An image is worth more than thousands words:

![Demo pi-codetour](../images/20261012-pi-codetour-demo.gif)

The features are honestly pretty simple and the code it's not worth to read as I didn't myself either. If you are
curious just install it with

```
pi install npm:@balanza/pi-codetour 
```

What is that I want to talk about, instead, is what led me to create it.

## What's the big deal?

Like many of my fellow programmers, I am reading a lot of code lately. Which shouldn't come as news *per se*, as our job
has always been about reading way more than it was about writing; nevertheless, we are all feeling overwhelmed by the
requests for review. There is a lot to resonate about this burdensome condition we are all finding ourselves in at the
same time, and in my opinion it cannot be explained by looking at the mere amount of code. But that's a topic for
another blog post.

What matters most to me is that **the way I read code has changed**. If 2024 me, while reviewing a PR, could have
focused on changed code lines, today there is a lot more around to look at. PRs are bigger, in the sense that they come
with a lot more changed code; they also arrive sort of out-of-the-blue, as it's often the case that my colleagues and I
are working on totally different epics on our own; and lastly, many agents contribute to the review with their
*opinions*, which are mostly valuable, but it's also more stuff to read and evaluate.

Instinctively, as the context around code grew tremendously, I felt the need and the benefit of cutting down the number
of tools and windows I have to jump to and from. Counter-intuitively, instead of adopting fully-integrated IDEs like
Cursor, JetBrains, or my beloved VSCode plus tons of extensions, I am now travelling down the evolution path and feeling
at home with just one big multiplexed window of [WezTerm](https://wezterm.org/) and NeoVim.

This low-profile tech is built with the idea that one can customise it to their own needs, given you accept dealing
with the plugin system and the freakish configuration options. Turns out, LLMs are very good at configuring these tools.

## It feels like nanotech

I have a weird analogy I want you to follow; lend me a minute.

Think about the MCU Iron Man. The suit [Mark III](https://ironman.fandom.com/wiki/Iron_Man_Mark_III) was a full-fledged
*ensemble* of tools, features, sensors, small and big weapons; behind those, an AI that is aware of such tooling and
operates for the best. On the other side, on the [Mark 50](https://ironman.fandom.com/wiki/Mark_50), the AI **is** the
tool, and features are just created on-the-fly, uniquely tailored to fit the situation. If in the first releases Tony
Stark had to think in advance about how to design for ergonomics in the most various set of occasions, with the
inevitable trade-offs between flexibility and specificity, in the latest productions he could just have both.

Here is my point: `pi-codetour` is my personal, humble experimentation on making the coding agent the first-class
citizen in my coding experience. Instead of integrating the agent into the IDE, I'm doing the opposite. The agent gives
me the part of code I need to read, with the slant I need, given the context and connected to the same storytelling of
the conversation. All of that using my editor with all the goodies, and keeping my navigation in the agent context for
follow-ups.

## It's for fun and profit

If reading this post made you think I am swimming in my own hubris, fear no more: I am well aware that this extension
is a toy if compared to what incredible people are doing in the agent harness field. Nevertheless, `pi-codetour` is
already a useful tool on my workbench; I use it daily, and it is helping me a lot in dealing with my job as a reviewer.

I think there is a new wave of software engineers who find proficiency in using LLMs to become better programmers.

We are all sharpening our knives.

