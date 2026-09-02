import React from 'react'
import {
  LuArrowRight,
  LuBookOpen,
  LuCompass,
  LuFeather,
  LuHeart,
  LuMessageSquare,
  LuShieldCheck,
  LuSparkles,
  LuUsers
} from 'react-icons/lu'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useAppContext } from '../context/useAppContext'

const About = () => {
  const { blogs, writers, navigate, writerToken } = useAppContext()

  const values = [
    {
      icon: <LuFeather className="h-6 w-6 text-[#702ae1]" />,
      title: 'Freedom to Publish',
      description:
        'Writers have the freedom to express genuine perspectives, technical deep-dives, and creative essays without restrictive gatekeeping.'
    },
    {
      icon: <LuBookOpen className="h-6 w-6 text-[#702ae1]" />,
      title: 'Distraction-Free Reading',
      description:
        'A clean, minimalist reading experience designed for focus. No aggressive popups or noisy ads—just quality stories.'
    },
    {
      icon: <LuHeart className="h-6 w-6 text-[#702ae1]" />,
      title: 'Direct Author Connection',
      description:
        'Readers can follow writers they admire, engage through respectful discussion comments, and bookmark articles to their personal library.'
    },
    {
      icon: <LuSparkles className="h-6 w-6 text-[#702ae1]" />,
      title: 'AI-Enhanced Creation',
      description:
        'Built-in creative suite featuring AI drafting assistance to help authors organize thoughts and craft compelling narratives.'
    }
  ]

  const howItWorks = [
    {
      role: 'For Writers',
      badge: 'Create & Share',
      steps: [
        {
          num: '01',
          title: 'Join the Writer Studio',
          desc: 'Create an author profile, share your bio, and establish your public writer persona.'
        },
        {
          num: '02',
          title: 'Draft with Rich Tools',
          desc: 'Use our streamlined distraction-free editor with AI brainstorming tools and custom cover uploads.'
        },
        {
          num: '03',
          title: 'Publish to the Feed',
          desc: 'Reach readers worldwide, track your read counts, and build a dedicated community of followers.'
        }
      ],
      ctaText: writerToken ? 'Open Writer Studio' : 'Become a Writer',
      ctaAction: () => navigate('/writer')
    },
    {
      role: 'For Readers',
      badge: 'Discover & Learn',
      steps: [
        {
          num: '01',
          title: 'Explore Curated Categories',
          desc: 'Browse hand-picked topics ranging from technology and startup strategies to lifestyle and culture.'
        },
        {
          num: '02',
          title: 'Follow Inspiring Voices',
          desc: 'Build your personal following feed so you never miss an essay or article from your favorite creators.'
        },
        {
          num: '03',
          title: 'Engage & Collect',
          desc: 'Like posts, participate in insightful comment threads, and save pieces to read anytime.'
        }
      ],
      ctaText: 'Explore Stories',
      ctaAction: () => navigate('/')
    }
  ]

  return (
    <div className="ethereal-shell min-h-screen overflow-x-clip bg-[#f6f6ff]">
      <div className="ethereal-orb ethereal-orb-primary" />
      <div className="ethereal-orb ethereal-orb-secondary" />

      {/* Sticky Minimal Navbar */}
      <Navbar containerClassName="mx-auto w-full px-4 sm:px-6 lg:px-10" />

      <main className="mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-14 lg:px-10">
        {/* Hero Section */}
        <section className="mb-16 border-b border-slate-200/80 pb-16 text-center sm:mb-20 sm:pb-20">
          <div className="mx-auto max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#702ae1]/20 bg-[#ede9fe] px-4 py-1.5 text-xs font-bold text-[#702ae1]">
              <LuCompass className="h-3.5 w-3.5" />
              Our Mission & Platform
            </div>

            <h1 className="font-[Manrope] text-3xl font-extrabold tracking-[-0.04em] text-slate-900 sm:text-5xl lg:text-6xl">
              Where thoughtful writers meet curious readers.
            </h1>

            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Digital Ethereal is a modern open publication space where writers come to share what they care about most, and readers discover fresh perspectives every day.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/writer')}
                className="rounded-full bg-[#702ae1] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#5e21c2] hover:shadow-lg"
              >
                Start Writing
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="rounded-full border border-slate-200 bg-white/90 px-7 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-950"
              >
                Browse Stories
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
              <p className="font-[Manrope] text-3xl font-extrabold text-slate-900 sm:text-4xl">{blogs?.length || 12}+</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">Published Stories</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
              <p className="font-[Manrope] text-3xl font-extrabold text-slate-900 sm:text-4xl">{writers?.length || 8}+</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">Active Authors</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
              <p className="font-[Manrope] text-3xl font-extrabold text-slate-900 sm:text-4xl">6</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">Curated Topics</p>
            </div>
            <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
              <p className="font-[Manrope] text-3xl font-extrabold text-slate-900 sm:text-4xl">100%</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">Open Access</p>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="mb-20 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#702ae1]">Why Digital Ethereal</span>
            <h2 className="font-[Manrope] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Crafted for Words that Matter
            </h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">
              We built this platform around four core design and community commitments.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#702ae1]/40 hover:shadow-md"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ede9fe] shadow-sm">
                  {v.icon}
                </div>
                <h3 className="font-[Manrope] text-lg font-bold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works for Writers & Readers */}
        <section className="mb-20 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#702ae1]">Two Halves of One Platform</span>
            <h2 className="font-[Manrope] text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              How Digital Ethereal Works
            </h2>
            <p className="mx-auto max-w-xl text-sm text-slate-500">
              Whether you are here to write your heart out or find your next favorite read.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {howItWorks.map((card, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-sm sm:p-10"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="rounded-full bg-[#ede9fe] px-3 py-1 text-xs font-bold text-[#702ae1]">
                      {card.badge}
                    </span>
                    <h3 className="font-[Manrope] text-xl font-extrabold text-slate-900">{card.role}</h3>
                  </div>

                  <div className="mt-6 space-y-6">
                    {card.steps.map((step) => (
                      <div key={step.num} className="flex gap-4">
                        <span className="font-[Manrope] text-lg font-black text-[#702ae1]/40 sm:text-xl">
                          {step.num}
                        </span>
                        <div>
                          <h4 className="font-semibold text-slate-900">{step.title}</h4>
                          <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6">
                  <button
                    type="button"
                    onClick={card.ctaAction}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#702ae1]"
                  >
                    <span>{card.ctaText}</span>
                    <LuArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Editorial Callout Banner */}
        <section className="relative overflow-hidden rounded-3xl border border-[#702ae1]/20 bg-[linear-gradient(135deg,#faf5ff,#f3e8ff)] p-8 text-center sm:p-14">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="font-[Manrope] text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Ready to be part of the dialogue?
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              Start following inspiring writers, bookmark your favorite stories, or share your own thoughts with the Digital Ethereal community today.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/writer')}
                className="rounded-full bg-[#702ae1] px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#5e21c2]"
              >
                Create Author Account
              </button>
              <button
                type="button"
                onClick={() => navigate('/writers')}
                className="rounded-full border border-slate-200 bg-white px-7 py-3 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Meet the Authors
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Improved Site Footer */}
      <Footer containerClassName="mx-auto w-full px-4 sm:px-6 lg:px-10" />
    </div>
  )
}

export default About
