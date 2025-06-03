# Tests and the QA

I recently had a chat with a developer friend about QA (that's _quality assurance_ for those who avoid corporate jargon). He shared some challenges his team was facing while trying to integrate their QA team into their development process.

The conversation sparked some interesting thoughts that I'd like to share here.

## The dilemma

These questions pop up in many software teams: Should QA engineers be sitting in daily standups and sprint plannings? Should testing be woven into the development process, or kept as a separate phase? And perhaps most importantly, how can developers and QA engineers work together effectively? 

My friend's team was wrestling with these exact dilemmas, but they're far from alone. These are common challenges that surface whenever organizations try to figure out the right balance between development and quality assurance. It's a dance many teams struggle to choreograph just right.

Here's an interesting observation: since QA's primary role is to write tests, particularly in the later stages of development, and developers are also engaged in test writing, this often creates some confusion about responsibilities and ownership. In my opinion, this perspective might need some reconsideration.

## Tests are not for quality

Let's get our terms straight first: when I talk about tests, I'm referring to what developers write, while QA-tests are what the QA team handles. Now, here's something that might ruffle some feathers: tests don't actually ensure software quality. Surprising, right? Software quality is really about how well our product meets both functional and non-functional expectations, but tests are something else entirely.

Think of tests like scaffolding when building a house. They're a development tool, a byproduct of the process that helps developers verify their code does what they intended it to do. This becomes especially crucial when you're making changes down the line. A well-crafted test typically zeros in on something specific - maybe a single function, a module, or how two systems talk to each other.

Here's the kicker: just because all your tests are passing doesn't mean you've got working software. It's a bit like having a perfect blueprint doesn't guarantee a perfect house. Tests are there to help developers build with confidence, but they're not the final word on quality - that's a whole different conversation.

## The developer bias

Here's something crucial about tests that often gets overlooked: Tests are primarily written to validate that the code behaves as the developer intended. If a developer misunderstands a requirement or makes assumptions about how the product should work, these same misunderstandings and assumptions naturally find their way into the tests. When this happens, tests end up confirming these biases rather than catching them.

These biases aren't just born from misinterpreting requirements. They're often deeply embedded in the team's daily routines and shared understanding of the system. Developers, spending most of their time working with the code's internal structure, can easily lose sight of how end users actually interact with the product. What might seem logical from a technical perspective might not align with user expectations.

## QA as a tool for product management
This separation from development becomes QA's key advantage. By staying outside of the development team's daily routines and technical details, QA engineers can maintain an unbiased view focused purely on how the software should work for users. They don't need to know the intricacies of the code - in fact, this distance helps them better validate the software's behavior from a user's perspective.

QA becomes particularly valuable when dealing with features that blur the line between internal and user-facing functionality, like application logs. While developers might see these as technical artifacts, QA teams can ensure they actually serve user needs during troubleshooting.

By working closely with product teams, QA engineers develop a strong understanding of what makes the software successful from a business perspective. They act as an independent verification layer that helps product managers ensure the development team's output aligns with the product vision, creating an effective feedback loop that catches misalignments early.
