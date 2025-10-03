---
layout: self
title: "Self Analysis"
permalink: /self/
description: "A space to explore your own personality."
hero_title: "Self Analysis 🪞"
hero_subtitle: "Reflect on your personality, strengths, and fit for career path."
hero_style: "text-heavy" 
hero_image: "self-hero-tree.jpg"
# pill: ""
closing_note: ""
css:
  - "self-cards.css"
  - "self.css"
  - "collapsible.css"
  - "self-compare.css"
js:
  - "collapsible.js"
  - "self-conpare.js"
---
## 🪞 The Self Layer – *Core of Your Psyche*

<br><br>
## Why the Self?
---
The Self is the **core framework** of who we are — the internal structure that organizes thought, feeling, and growth.  
It is not about performance or outward roles, but the **living center** that anchors your psyche.  

The Self remains when masks are set aside and outer personas shift.  
It guides Shadow work, informs choices, and allows your Persona expressions to adapt without losing balance.  

Understanding the Self is the starting point for maturity: without a stable center, any outer expression can feel ungrounded.


<!-- --- -->

<br><br>
## The Backbone of the Model
---
This framework emphasizes three primary voices in the study of Self:

- **Carl Jung, M.D.** → Originator of cognitive function theory (introversion, extraversion, thinking, feeling, sensing, intuition). His work remains the philosophical and psychological root.  
- **John Beebe, M.D.** → Expanded Jung’s work into the *8-function archetype model*, mapping both conscious and shadow functions.  
- **Dario Nardi, Ph.D.** → Neuroscientist whose EEG research provides biological evidence of cognitive functions in real-time brain activity.  

Together, they form a **tested, flexible backbone** for Self analysis — psychological depth, archetypal framing, and neuroscientific support.

<!-- --- -->


<div class="collapsible-section">
  <div class="collapsible-header">
    <h2>🌐 The Grid of Selves</h2>
    <span class="toggle-icon">−</span>
  </div>
<div class="collapsible-content">
  <p>Below is the <strong>MBTI Personality Grid</strong> — 16 entry points into the Self.<br>
  Each card links to deeper analysis of functions, shadow expressions, and growth paths.</p>
  <p>If you already know your MBTI type, you can jump straight to your card.  
  If not, we recommend taking a reliable test such as <a href="https://www.16personalities.com/free-personality-test" target="_blank">16Personalities</a>.  
  Take the test in a place and state of mind where you feel most comfortable — whether that’s at work, at home, or in your community.  
  If you’re still unsure about your type? Return later and use our <strong>Compare feature</strong> below the 16 cards to explore differences and see which type resonates most with you.</p>

    <div class="grid">
      {% assign mbti_types = "INTJ,INTP,ENTJ,ENTP,INFJ,INFP,ENFJ,ENFP,ISTJ,ISFJ,ESTJ,ESFJ,ISTP,ISFP,ESTP,ESFP" | split: "," %}

      {% for type in mbti_types %}
        {% assign info = site.data.mbti[type] %}
        {% assign desc = site.data.self[type] %}
        <a href="{{ site.baseurl }}/self/{{ type | downcase }}.html" class="card-link">
        {% include card-self.html %}
        </a>
      {% endfor %}
    </div>
  </div>
</div>


## Compare Cards
---
For those who have difficulty knowing which type you are, please select 2 cards and see the difference, whichever resonant at a comfortable level is you.

{% include self-compare.html %}


<br>

## What About Other Models?
---
Personality theory has spawned countless systems. While valuable, many:  
- **Oversimplify** Jung’s insights into static stereotypes.  
- **Overcomplicate** without clarity, creating endless labels.  
- **Stay surface-level**, focusing on traits rather than *processes*.  

This space doesn’t reject those models — but it anchors in Jung, Beebe, and Nardi as the most fertile ground for Self exploration.  
Other systems are like side-paths: interesting to visit, but not the core map.

<br><br>
<div class="references">
<h2>References</h2>
  <ul>
    <li>Jung, C. G. (1968). *The Archetypes and the Collective Unconscious* (Collected Works, Vol. 9, Part 1). Princeton University Press.<br>
      <span class="ref-note">→ Explores archetypes and unconscious patterns that shape personality and behavior.</span>
    </li>
    <li>Jung, C. G. (1963). *Memories, Dreams, Reflections*. Vintage Books.<br>
      <span class="ref-note">→ Jung’s reflections on personal development, individuation, and self-awareness.</span>
    </li>
    <li>Beebe, J. (1994). *Integrity in Depth: Archetypal Explorations of the Persona, Shadow, and Complexes*. Routledge.<br>
      <span class="ref-note">→ Provides insight into the Persona, Shadow, and archetypal dynamics in everyday life.</span>
    </li>
    <li>Nardi, D. (2011). *Neuroscience of Personality: Brain-Savvy Insights for All Types of People*. Radiance House.<br>
      <span class="ref-note">→ Maps cognitive patterns to brain activity, showing how personality types influence behavior and interactions.</span>
    </li>
  </ul>
<p class="ref-more"><a href="{{ site.baseurl }}/references/">See all references →</a></p>
</div>

