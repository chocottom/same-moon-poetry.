import { db } from "./db";
import { poems, prose } from "../shared/schema";

async function seed() {
  console.log("🌙 Seeding Same Moon Poetry database...");

  const poemData = [
    {
      title: "The Rare Ones",
      content: "in a world too loud to listen, i realized something... some people are like treasure — rare, hidden, sometimes buried deep beneath noise and distraction. it's hard to find someone who really understands you, someone who shares that quiet spark that makes you feel seen, like they've touched the part of you you couldn't even name. my favorite people are the ones who evolve — open-minded, ready to learn, ready to live new experiences. and when you find that sweet chemistry, that unexplainable click between souls... the magic begins. but even magic fades when one soul stops showing up. so sometimes, you have to let things go. because if they truly know your worth, they'll circle back — and if they don't... well, we live in an age where meaning is vanishing, where connection's become just another notification. everyone's online — but it feels like no one's there. scrolling, replying, talking — but not really speaking. i'm the type of guy who craves the real — a small talk that feels big, a shared silence that says everything, eye contact that speaks louder than words. you get the point... i'm not chasing attention — i'm searching for presence. because in the end, presence is the rarest treasure left.",
      theme: "Presence & Connection",
      mood: "Reflective",
      readingTime: 3,
      status: "published",
      isFeatured: 1,
    },
    {
      title: "If You Have to Ask",
      content: "It's been a long time since I did one of these, but inspiration comes and goes. Anyways, I learned a valuable lesson. What lesson, you may ask? Let me tell you: \"If you have to ask for it, it loses its value.\" Damn— that's too good of a lesson. Mind your business, do what makes you happy, and everything else will come naturally. That's why I fell in love with this quote: \"Don't chase butterflies, plant a garden instead.\" This showed me: you attract what you are. And thank God I learned this early in my life— God knows best. Every chapter, every human interaction became a lesson for me. That switch in mindset— a real game changer.",
      theme: "Time & Purpose",
      mood: "Inspiring",
      readingTime: 2,
      status: "published",
      isFeatured: 1,
    },
    {
      title: "Each One a Mirror",
      content: "Here we are again, charged, full of emotions, and above all—gratitude to Allah. I am blessed, alhamdulillah. I sit on my balcony, the sky stretched like a painting: light above, fiery orange below, mountains fading in the distance. But the moon— cut in half, grabs all my attention. And I whisper to myself: \"How did I miss all this beauty, all this glory in front of me?\" Thanks to someone— who inspired me, not with words, but with action, I found a new me. Wallahi, this brings me peace. I was inspired. Inspired by how they look at the sky differently, inspired by their passion for reading. At first, it felt strange— but soon, I was drawn in. Book by book, page by page: from The 48 Laws of Power, to The Psychology of Money, from Ego is the Enemy, to In Our Stories We Live. Each one a step, each one a mirror. And above all, strengthening my bond with Allah turned me into someone new. Now as I write, night has arrived— stars scattered in the distance, and the moon, magnificent, still watching over me. But at least we are watching the same moon.",
      theme: "Spiritual Depth",
      mood: "Reflective",
      readingTime: 2,
      status: "published",
      isFeatured: 1,
    },
    {
      title: "When Today Is Enough",
      content: "I wake up and the sun is already smiling birds doing their thing outside coffee in my hand, no rush in my step and I wonder— why do we make life harder than it is Why stress about tomorrow when today is sitting right here singing its simple song isn't this enough the breath in my chest the laugh waiting with my friends the small wins nobody claps for but me I used to think happiness was a place something I had to chase but maybe it's just this a good vibe a clear sky a moment where nothing feels missing And if storms come—so what doesn't the rainbow always follow so why complain about the clouds when they're just painting the view So yeah today I choose peace I choose laughter I choose the light in small things and maybe that's the secret after all",
      theme: "Growth & Becoming",
      mood: "Reflective",
      readingTime: 2,
      status: "published",
      isFeatured: 0,
    },
    {
      title: "Empty but Alive",
      content: "I sat on the couch, listening to the calming sound of crickets, rain falling, drop by drop. Honestly, the vibe was perfect for relaxing and writing, but inside I felt empty. You might ask—what's the thing that does this to you? Truth is, I don't even know. When I pick up a pencil and let it move, words come naturally. I don't know if that's a blessing or just something developing inside me. Damn, I went too deep—time to breathe. Still, a thought crosses my mind: We've all faced storms in our lives, yet we complain about a little rain on another day. So I made a promise to myself: never complain. Because really, what's the point? Complaining fixes nothing. Picture this: it's a burning hot day, you're working, laughing, talking with your friend— and suddenly I complain about the weather. Just like that, the vibe shifts. Negative energy spreads, and nothing changes. That's enough yapping for today. I'll leave it here, like raindrops fading into silence— a small truth whispered, but still enough to carry me forward.",
      theme: "Growth & Becoming",
      mood: "Melancholic",
      readingTime: 2,
      status: "published",
      isFeatured: 0,
    },
    {
      title: "Choose Your Hard",
      content: "\"Time\", people overlook it, but it's the very thing that shapes us. It builds discipline, it turns dreams into reality. Lately, I've been living with purpose. Every minute feels valuable. Yeah, I'm busy— but it's the kind of busy that makes me proud. Balancing studies, the gym, personal work— it's not easy. But easy never built anything. Excuses? I don't buy them. The classic \"I got no time\"? That's just fear in disguise. Here's the truth: Life will always be hard. But you get to choose your hard. Grinding is hard. Wasting time and regretting later is harder.",
      theme: "Time & Purpose",
      mood: "Energetic",
      readingTime: 2,
      status: "published",
      isFeatured: 0,
    },
    {
      title: "Hidden Gem",
      content: "Lately I've been feeling so light — genuinely joyful, and honestly, I can't even tell you why. Maybe it's the habits quietly stacking up, or the good encounters slowly filling me. Either way, it feels like a good season. I'm enjoying working on myself, like I'm uncovering new layers of who I am. These past few years, I've collected so much — traits, lessons, small skills — each one shaping me into something I never expected. I want to be that hidden gem — rare, calm, unbothered, full of depth for those who look close enough. I remind myself to laugh more, to play, to dance freely with the unexpected, and to share my light with those around me— because joy grows deeper when it's given away. I've learned that moving through life without grabbing every worry like a stone is a quiet gift, like finding soft sunlight on a chilly morning— not the kind that fixes all the cracks, but the kind that warms from within. So I carry my joy like a secret flame, and let my growth bloom in silence. Maybe this season is teaching me that peace isn't a still river— it's the gentle current beneath, pulling everything slowly toward calm.",
      theme: "Growth & Becoming",
      mood: "Reflective",
      readingTime: 2,
      status: "published",
      isFeatured: 0,
    },
    {
      title: "Becoming",
      content: "Change doesn't hit all at once— it's like a slow sunrise, filling the sky in quiet colors before you even notice. There's no moment you can point to and say, \"Yeah, that's when I changed.\" It happens in the spaces where you stop explaining, where you stop running after what's already yours. You just… slow down. And somehow, that's where everything begins. You start seeing yourself in the small things— the way you walk away without anger, the way silence doesn't scare you anymore. Growth doesn't shout; it's the soft replacing of old noise with peace. Time, the hardest teacher I've met, taught me healing isn't progress you can post— it's choosing yourself again, and again, and again. Becoming isn't about changing. It's about remembering who you were before the world told you otherwise. And one day, someone will notice. They'll say, \"You're different.\" But really— you just finally became you.",
      theme: "Growth & Becoming",
      mood: "Reflective",
      readingTime: 2,
      status: "published",
      isFeatured: 0,
    },
  ];

  const proseData = {
    title: "Nice Encounter",
    philosophyContent: "Ah, the art of manifesting — honestly, it's one of the most delightful feelings. It's like rewiring your brain to attract a certain moment, person, or outcome that you truly desire.",
    narrativeContent: "Let me tell you a story. Last night, during my usual walk, this random thought just popped into my head about the person who first made me curious about reading — funny how something so small ends up changing so much. I hadn't seen them in years, and honestly, I went about my day like usual, not expecting anything. Then SubhanAllah, today, they came up to me first — calm and friendly, like time hadn't even passed. Don't get me wrong — we're all just people. I'm not putting anyone on a pedestal. But sometimes, someone's energy just grabs you. Their presence, their vibe — it speaks louder than words. It can happen in the simplest ways — through a look, a smile, or a few honest words. Lately, I've realized I've been developing a new skill: learning to read people. I'm still learning as I go, but it gives me a whole new perspective on how to see things. Kindness can show in small acts — like respecting the elderly, letting them go first, or giving up your seat. Little actions can say so much about a person. Sometimes, they even bring back memories you'd forgotten, showing how deeply they notice and listen. They're not just waiting for their turn to talk — they listen. They pay attention. And honestly, I'm the kind of person who loves that. I love observing, listening, and admiring the small things in life.",
    theme: "Presence & Connection",
    mood: "Reflective",
    readingTime: 3,
    status: "published",
    isFeatured: 1,
  };

  try {
    // Clear existing data
    await db.delete(poems);
    await db.delete(prose);

    // Insert poems
    for (const poem of poemData) {
      await db.insert(poems).values(poem);
      console.log(`✓ Added poem: ${poem.title}`);
    }

    // Insert prose
    await db.insert(prose).values(proseData);
    console.log(`✓ Added prose: ${proseData.title}`);

    console.log("✨ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
