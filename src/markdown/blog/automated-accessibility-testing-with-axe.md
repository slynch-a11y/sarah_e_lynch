---
title: Automated Accessibility Testing with Axe-Core
date: '2021-05-30'
description: 'automated accessibility testing with axe-core'
tags: focus indicators
featuredImage: 
featuredImageAlt: 
---

As developers, we know how important it is to write tests to avoid introducing bugs in our code.  In the long run, tests will save us time and avoid unnecessary headaches.  The greater your test coverage, the greater chance of finding (and avoiding) regression bugs.  This article is an overview of how to test for accessibility bugs using axe-core.  This is in no way a comprehensive guide to axe-core or accessibility testing, but hopefully a starting point and motivation to test for accessibility issues.

## Accessibility Issues

Not all accessibility issues can be found with automated testing.  There is a debate about the percentage of accessibility issues that can be found via automated testing, but it’s certainly not 100% and depending on the application and testing tools, the percentage can vary quite a bit.  Gov.uk ran a study and found that [automated testing tools caught 30-40% of accessibility issues](https://accessibility.blog.gov.uk/2017/02/24/what-we-found-when-we-tested-tools-on-the-worlds-least-accessible-webpage/).
Deque (the company that works on axe-core) recently published that [automated testing identified 57% of digital accessibility issues](https://www.deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues/).  This means that manual testing must also be done.  However, writing unit/integration/end-to-end tests, using packages like Deque’s axe-core, and installing linters in your IDE (integrated development environment) can all drastically reduce the number of accessibility issues that get sent to production.

## Axe-Core

The [axe-core API](https://github.com/dequelabs/axe-core) is a powerful tool for testing HTML-based UIs (user interfaces).  Axe-core is found in a [large number of accessibility projects](https://github.com/dequelabs/axe-core/blob/develop/doc/projects.md).  Some popular Deque products with the axe-core testing engine include the [Axe DevTools browser extension (for Chrome, Firefox, and Edge)](https://www.deque.com/axe/browser-extensions/), testing framework integrations such as with [WebdriverJS](https://www.npmjs.com/package/@axe-core/webdriverjs), and a simple to use CLI (command line interface) known as [axe-core CLI](https://www.npmjs.com/package/@axe-core/cli).  Community projects include [Chrome DevTool’s Lighthouse](https://github.com/GoogleChrome/lighthouse), [Microsoft’s Accessibility Insights for Web](https://accessibilityinsights.io/), [Storybook-addon-a11y](https://github.com/storybookjs/storybook/tree/master/addons/a11y), and many testing framework integrations, such as [jest-axe](https://github.com/nickcolley/jest-axe) and [cypress-axe](https://github.com/component-driven/cypress-axe).  The axe-core script can be used alone, but it’s most effective when used within the testing framework and Continuous Integration pipeline you have (or should have) already established. 

## Test the UI (All the UI)

It is important to run tests that insert calls to the axe-core API when a new piece of UI becomes visible or the DOM has been updated.  That is, don’t forget to run the axe script on any (open) modal dialogs, menus, accordions, or other components that may be hidden in their initial state (including at different viewport sizes).  

## The Axe-Core Rules

Axe-core prides itself in producing zero false positives (bugs notwithstanding).  The team behind axe-core is continually improving and adding new rules to its test suite.  The rules include tests for WCAG 2.0 and 2.1 level A and AA success criteria and accessibility best practices. Deque has listed all of the [axe-core rules in this lovely markdown file](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md), with each rule linking to Deque’s comprehensive rule description on Deque University.  The "experimental" rules listed are still in development and so are not enabled by default in axe-core (however, they are enabled for the browser extension).  The axe-core rules are great for finding misuse of ARIA attributes, missing form labels, insufficient color contrast, missing alt text, and so much more.  

## Rules Concerning Color Contrast

The rules that test color contrast issues are known not to work with the [JSDOM](https://github.com/jsdom/jsdom) (a lightweight browser implementation that runs inside Node.js). These are the "[color-contrast](https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=RuleDescription)" rule, and the (experimental / not enabled) "[link-in-text-block](https://dequeuniversity.com/rules/axe/4.2/link-in-text-block?application=RuleDescription)" rule. Axe-core can be used in any kind of functional test, but you must be aware of this limitation.  Using axe-core in an end-to-end test in a browser will be most effective since it will flag these color contrast issues.  However, browser testing each UI and change in UI can be slow.  It might be wise to minimize the number of times a browser will have to open and close by limiting browser testing to just a few pages.  These pages should have a representative sample of components with the color combinations used throughout your application.  This could be a way of including color contrast checks alongside the other checks used in non-browser tests.

## Testing iFrames

It is important to keep in mind that the axe-core API is capable of testing within iframes.  However, this takes additional setup as the axe script will need to be injected into each iframe.  There are products available that take care of this set up for you.  The [Axe DevTools browser extension](https://www.deque.com/axe/browser-extensions/) will automatically check iframes, as will [@axe-core/webdriverjs](https://www.npmjs.com/package/@axe-core/webdriverjs) and the [axe CLI](https://www.npmjs.com/package/@axe-core/cli).

## The Axe-Core API

The complete [axe-core API documentation](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md) has all of the information you will need to configure and run axe.  I won't go into detail here, but will quickly cover the primary script (```axe.run```) that runs the rules against the rendered UI.  The ```axe.run``` script takes 3 optional arguments: the context parameter, the options parameter, and a callback function.

### Context Parameter

By default, the axe script will run on the full document, checking page-level rules.  The [context parameter](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#context-parameter) can be used to specify which elements to include or exclude in a test. By passing a component to axe as an argument, axe will automatically exclude any page-level rules.  Page-level rules would include checks for a missing lang attribute in the ```<html>``` element or a missing (or empty) ```<title>``` element.  This makes it easy to run unit tests on individual components (useful for component library tests). However, most applications will require page-level integration tests as these are most effective for finding accessibility issues.

### Options Parameter

The [options parameter](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter) can be used to configure how ```axe.run``` will operate.  This is where you can include or exclude rules. There are other options that can be set within this object and if you need more configuration, there is the more powerful [```axe.configure```](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axeconfigure) method.

### The Callback Function

The [callback function](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#callback-parameter)
will run after ```axe.run``` is complete.  It takes two parameters: an error and a results object.  

### Results

Results are returned in JSON format.  The JSON object includes rules organized into arrays named "passes", "inapplicable", "incomplete", and "violations".  "Incomplete" items require manual review. You can save these results for processing later or write assertions based on the violations.  These assertions can be used (alongside your other unit and integration tests) to help in your Continuous Integration (CI) pipeline.  Assertions that fail should block any code from being merged or deployed into production.  

## Summary

Taking the time now to include accessibility tests in your development environment will ultimately save your team time and money.  Using a library such as axe-core, along with linters, and writing your tests with accessibility in mind, will help avoid sending accessibility issues to production.  While automated testing is important, it is vital to do manual accessibility testing as well.  Finally, user testing with people with disabilities should be considered a requirement to make your product truly accessible and the best it can be.  

## Resources

* [dequelabs/axe-core: Accessibility engine for automated Web UI testing](https://github.com/dequelabs/axe-core)
* [axe-core API Documentation](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md)
* [Writing Automated Tests for Accessibility](https://www.24a11y.com/2017/writing-automated-tests-accessibility/)

