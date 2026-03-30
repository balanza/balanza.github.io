---
title: "How come we are releasing Distrobox v2"
date: 2026-03-30
status: published
---

[Distrobox v2](https://github.com/89luca89/distrobox/releases/tag/2.0.0-rc.1) has been announced to the
public yesterday and I cannot be more thrilled! It is a complete rewrite in Go that we have been working
on for the last few months.

[The introduction post](https://distrobox.it/posts/announcing_distrobox_next/) tells everything worth
knowing about the project; here I would like to say something about how my fellows and I got here.

## Distrobox is a great daily driver

First of all: I've been using `Distrobox` for some time, and it rapidly became one of the tools I always
want on my workstation. I initially used it as a tool to preserve my local setup when installing libraries
that I need only in specific contexts. A perfect example is building packages for openSUSE, for which
[a very handy image](https://en.opensuse.org/Distrobox#Distrobox_For_Packagers) is provided; but also
to use libraries that are a bit clunky to install (talkin' to you, `ansible`!) and I do not want to
mess up my workstation.

Distrobox is also a first-class citizen in [openSUSE Aeon](https://aeondesktop.github.io/) where it is
fundamental to easily install apps and CLI utilities, given the distro itself is immutable.

Also: the program you need is not packaged for your distro? No problem, just spin up a `Distrobox` with
the right image.

## My first contribution

Have a look at the [issue section](https://github.com/89luca89/distrobox/issues) and you realize that
there is more than one way to use `Distrobox`.
Some people just create containers on the fly and treat them as snowflake instances; I personally
prefer a declarative approach whenever possible, so no wonder I am a big user of manifest files and
`distrobox assemble`.

It didn't take long before my manifest file became big enough that it was annoying to repeat the same
configuration for every similar container.
Thus I proposed the [include](https://github.com/89luca89/distrobox/pull/1860) feature, so that sharing
common attributes between definitions would be possible. The implementation per se was straightforward,
and I was able to add the feature just *on top* of the manifest parsing phase, without the need to
inject my new logic into the working script; I wouldn't have had the confidence to propose the pull
request otherwise.

I feel confident with shell scripts, I even enjoy writing them, despite many of my peers approach
them as a farmer entering a pig barn for the monthly cleaning.
Even so, getting hands-on with the `Distrobox` codebase I realized how entangled the scripts had become
over the years, with a lot of repetition and bravely **zero test coverage**.

That's when I started discussing with [**Luca**](https://github.com/89luca89) about possible
improvements to the codebase.

## We met at a not-very-strange time in our life

Long story short: by chance, [Alessio](https://github.com/dottorblaster) and
[Fabrizio](https://github.com/fabriziosestito) were having similar conversations with Luca, because
they also wanted to add features to `Distrobox`, but felt slowed down by the lack of tooling. No wonder
we teamed up for the task.

Being together, we felt confident enough to undergo a total rewrite instead of a more conservative
iterative approach.
Luckily it was [SUSE's HackWeek](https://hackweek.opensuse.org/25/projects) period, or *"developer
Christmas"* as I like to call it; having a full week for bootstrapping the project gave us the momentum
we needed.

Roughly 80% of the rewrite was done in the first week. Then, it was a *piece-by-piece* refinement to
converge to a v2 version that is feature-comparable with v1.

## It's not over until it's over

As of yesterday, the code is open to the public. As stated in
[the introduction post](https://distrobox.it/posts/announcing_distrobox_next/), the main focus now is
to ensure Distrobox v2 is ready to replace the current version, meaning it does everything v1 does
without significant regressions. 

Once we are there, we have many ideas we want to build.

I expect (hope!) many issues to be reported about unhandled cases in the new version.

----

### Try Distrobox v2 now:

**Download latest release candidate**

Visit https://github.com/89luca89/distrobox/releases/tag/2.0.0-rc.1

**Build from source**

```sh
git clone https://github.com/89luca89/distrobox.git
cd distrobox
git checkout next
make build
sudo make install
```

**Install on openSUSE**

```sh
zypper addrepo https://download.opensuse.org/repositories/home:balanza/openSUSE_Tumbleweed home_balanza
zypper in distrobox-next
```
