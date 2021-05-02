---
title: Focus Indicators
date: '2021-04-30'
description: 'this is my first blog post'
tags: focus indicators
featuredImage: 
featuredImageAlt: 
---

Almost every single time I test a site for accessibility, I find issues with the focus indicator.  Sadly, I just don’t think it is on the radar of most developers.  Keyboard users need some kind of indication of where they are when interacting with a web page.  A focus indicator is the visual indication of an interactive element that a keyboard user is currently on (such as buttons, links, and form fields). To try this out for yourself, just use the Tab key on this page.  As you keep Tab-ing, you’ll notice the styled focus indicator (an outline) move from one interactive element to another (use Shift + Tab to move back).  You should also be able to interact with these elements using your Enter or Spacebar keys.  Having a visual focus indicator is very important for sighted people that use assistive technology such as voice input or a [switch device](https://axesslab.com/switches/).  Focus indicators are also helpful for people with low vision that use the keyboard. 

Developers and designers need to thoughtfully style their focus indicators.  Focus is styled by using the :focus CSS pseudo-class.  For example:
```
button:focus {
  outline: 2px solid black;
}
```
Don’t ever remove the focus outline, but also don’t leave it up to browser defaults as these vary greatly by browsers.  There are guidelines to help with understanding how to style focus indicators for people with disabilities.  These guidelines are known as WCAG.

## Web Content Accessibility Guidelines (WCAG)

I haven’t mentioned the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) yet in my blog posts.  WCAG was developed by the W3C (World Wide Web Consortium) to “provide a single shared standard for web content accessibility”.  The guidelines are organized under [4 principles: perceivable, operable, understandable, and robust](https://www.w3.org/WAI/WCAG21/Understanding/intro).  For each guideline, there are testable success criteria, which are at [three levels: A, AA, and AAA](https://www.w3.org/WAI/WCAG21/Understanding/conformance), where level A is the minimum level of conformance and level AAA is the highest.  Keep in mind that these guidelines are the bare minimum rules to follow to create an accessible site.

## WCAG 2.1
The current (2.1) version of WCAG does not have a lot to say about focus indicators other than they should be visible and have at least a 3:1 color contrast ratio with their surroundings:
* [2.4.7 Focus Visible, Level AA](https://www.w3.org/TR/WCAG21/#focus-visible)
* [1.4.11 Non-text Contrast, Level AA](https://www.w3.org/TR/WCAG22/#non-text-contrast)

## WCAG 2.2
WCAG version 2.2 is expected to be finalized this year, but the working draft is published and in this version focus indicators are a high priority.  The success criterion 1.4.7 Focus Visible has been redesignated to a Level A criterion, meaning this is now the lowest level of conformance that all websites must meet.  There are also two new success criteria relating to focus indicators:
* [2.4.11 Focus Appearance (Minimum), Level AA](https://www.w3.org/TR/WCAG22/#focus-appearance-minimum)
* [2.4.12 Focus Appearance (Enhanced), Level AAA](https://www.w3.org/TR/WCAG22/#focus-appearance-enhanced)

We will explore what these two new success criteria mean.

## 2.4.11 Focus Appearance (Minimum), Level AA
Success criterion 2.4.11 Focus Appearance (Minimum) states that all of the following must be true regarding focus indicators:
* Contrasting area: There is an area of the focus indicator that has a contrast ratio of at least 3:1 between the colors in the focused and unfocused states.
* Minimum area: The contrasting area is at least as large as:
  - Outline: the area of a 1 CSS pixel thick perimeter of the unfocused component, or
  - Shape: the area of a 4 CSS pixel thick line along the shortest side of a minimum bounding box of the unfocused component, and no thinner than 2 CSS pixels.
* Adjacent contrast: The contrasting area also has a contrast ratio of at least 3:1 against adjacent colors in the focused component, or the contrasting area has a thickness of at least 2 CSS pixels.
* Not fully obscured: The item with focus is not entirely hidden by author-created content.

Yikes!  There is a lot to unpack here.  I’m going to try to make this more understandable. If you want to dig into this more yourself, you should [read the Understanding docs on this success criterion](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance-minimum.html). Let’s work through each of the above requirements.

### Contrasting Area Requirement
This one is pretty straightforward.  The colors of the unfocused and focused states of an interactive element must have a contrast ratio of at least 3:1.

For example:

<figure>
    <img src="/images/focus_indicators/background-change.png" alt="A control that changes background color between focus states." />
    <figcaption>The change in color from dark green background (unfocused) to white background (focused) has a color contrast ratio of 4.7:1 (well over the 3:1 minimum).</figcaption>
</figure>

### Minimum Area Requirement
This is where things get a little complicated.  There is a calculation you can use to determine how big your focus indicator should be.  However, “if you need to use complex mathematics to work out if a focus indicator is large enough, it is probably a sign that you should use a larger and proportional indicator that will provide a more visible indicator” (from the [Understanding Success Criterion 2.4.11](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance-minimum.html)).  I like to summarize the minimum area like this: 
1. The first calculation is “the area of a 1 CSS pixel thick perimeter of the unfocused component”.  This means that the focus indicator area must be at least 1 x the perimeter of the unfocused control.  For example:
   * If your focus indicator is an outline around the focusable element, it is sufficiently large enough. 
<figure>
    <img src="/images/focus_indicators/1px-outline.png" alt="A control using a 1px outline around the perimeter." />
    <figcaption>The focused state is indicated by a 1px outline around the perimeter of the focusable element.</figcaption>
</figure> 
   * If your focus indicator is slightly smaller than the focusable element, it may be sufficiently large enough if it has an extra pixel or two of width (you’ll need to calculate).  
   * Just changing the background color is sufficient (as the contrasting area is sufficiently large enough).
   * Be aware of responsive design and if that control changes size at different viewports (you’ll need to calculate if you’re not using a proportionally sized indicator).
   * Using a dotted line may not be sufficient as it is using half the number of pixels as a solid line (you’ll need to test in different browsers and calculate).
2. This requirement includes a second calculation: "the area of a 4 CSS pixel thick line along the shortest side of a minimum bounding box of the unfocused component, and no thinner than 2 CSS pixels".  In other words, the focus indicator area must be at least 4 x the shortest side of the unfocused control (and no thinner than 2px wide).  This calculation is meant for focusable controls that are rectangular.  Any non-rectangular controls should use the 1 CSS pixel perimeter calculation as a guide.
<figure>
    <img src="/images/focus_indicators/short-side.png" alt="A control using a 4px wide left border (its shortest side)" />
    <figcaption>The focused state is indicated by a 4px thick line along the shortest side of the focusable element.</figcaption>
</figure>

Bottom line, if you don’t want to bother thinking about the calculation for the minimum area requirement just use a solid outline around the entire control or change the background color.  

## Adjacent Contrast Requirement
There are two options to pass this requirement.

1. “The contrasting area also has a contrast ratio of least 3:1 against adjacent colors in the focused component”:
<figure>
    <img src="/images/focus_indicators/1px-outline.png" alt="A control using a 1px outline around the perimeter." />
    <figcaption>The focused state is indicated by a 1px outline around the perimeter of the focusable element.  Because it is using an offset, the outline is only adjacent to the white background and therefore passes the color contrast requirement.</figcaption>
</figure> 

2. “or the contrasting area has a thickness of at least 2 CSS pixels”:
<figure>
    <img src="/images/focus_indicators/2px-thick-border.png" alt="A control using a 2px thick border to indicate its focus state." />
    <figcaption>This element is using a 2px thick border to indicate its focus state.</figcaption>
</figure> 

I don’t like the second part of this requirement - that it’s okay to not have adjacent contrasting colors if the thickness is at least 2px. In the above example, I have an outline of 2px around the focused state.  It’s very hard to tell the difference between the two states.  While there was a sufficient change in contrast from the white to the green, the adjacent contrast does not have sufficient contrast (the focus indicator is using the same green color as the button’s background). According to this requirement, the focus indicator can be the same color as an adjacent color. However, this makes the focus indicator almost invisible.  The 2px thickness doesn’t help at all.  

Remember, these guidelines are the bare minimum that should be followed.  It is best practice to go above and beyond and make that focus indicator stand out. 

### Not Fully Obscured Requirement
“The item with focus is not entirely hidden by author-created content.”
We don’t want to ever obscure content on our pages.  The focus indicator is no different.  A focus indicator can be obscured by sticky headers or footers or just elements that are not sufficiently spaced.  Test with your keyboard as you are developing!  

## 2.4.12 Focus Appearance (Enhanced), Level AAA
Success criterion 2.4.12 Focus Appearance (Enhanced) states that all of the following must be true regarding focus indicators:
* Contrasting area: There is an area of the focus indicator that has a contrast ratio of at least 4.5:1 between the colors in the focused and unfocused states.
* Minimum area: The contrasting area is at least double the area of a 1 CSS pixel perimeter of the unfocused component;
* Not obscured: No part of the focus indicator is hidden by author-created content.

This Success Criterion expands the minimum area to at least double the area of a 1px perimeter.  The change in color contrast between the focused and unfocused state must be at least 4.5:1.  Finally, no part of the focus indicator should be obscured by other content on the page.

## Common CSS Properties to Style Focus

### Box-Shadows
Be careful when using CSS box-shadows as focus indicators.  Windows High Contrast Mode (WHCM) removes any CSS box-shadow properties.  However, there is a workaround for this.  If a transparent outline is used, WHCM will be able to override this outline so it is visible.  That is, instead of using ```outline: none;``` use ```outline: 2px solid transparent;``` (along with your box-shadow).  The transparent outline will only show in WHCM. 

### Outline-Offset
Use the CSS outline-offset property if you can.  It makes a big impact on the visual appearance of the focus indicator and makes it easier to get adjacent contrasting colors.  While it may be okay according to WCAG to have insufficient adjacent color contrast if the thickness is at least 2px, it is better to have sufficient color contrast all around.  

## Summary
I’m glad to know that the next version of WCAG is moving focus indicators into a higher priority and giving more direction on how they should be styled, but we need to think beyond WCAG.  To be more inclusive, we need to follow best practices and design our focus indicators to stand out.  It is also best practice to design our focus indicators consistently on the page and to make them intuitive.  Using affordances we already have, users will know that they are viewing a focus indicator.  Finally, if you want to make sure your design works, user test with people with disabilities.  

## Resources
* [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
* [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
* [Understanding Success Criterion 2.4.11: Focus Appearance (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance-minimum.html)
* [Understanding Success Criterion 2.4.12: Focus Appearance (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance-enhanced.html)
