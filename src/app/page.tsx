import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Upload, Search, Truck, ShieldCheck, Clock, Star, Quote } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      <Navbar />

      {/* Hero Section with Glassmorphism */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-white to-white pt-20 pb-32">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-white/50 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-blue-700 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                #1 Pharmacy App in 2025
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Your Health, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                  Digitally Perfected.
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Skip the queue, not the care. Upload prescriptions, track refills, and get expert advice—all from the comfort of your home.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link href="/upload">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all hover:-translate-y-1">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Prescription
                  </Button>
                </Link>
                <Link href="/catalog">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full border-2 border-slate-200 hover:border-blue-200 hover:bg-blue-50 transition-all hover:-translate-y-1">
                    <Search className="mr-2 h-5 w-5" />
                    Browse Store
                  </Button>
                </Link>
              </div>

              <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 border-t border-slate-100 mt-8">
                <div className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-slate-900">10k+</p>
                  <p className="text-sm text-slate-500 font-medium">Happy Patients</p>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-slate-900">98%</p>
                  <p className="text-sm text-slate-500 font-medium">On-Time Delivery</p>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-slate-900">4.9</p>
                  <p className="text-sm text-slate-500 font-medium">App Rating</p>
                </div>
              </div>
            </div>

            {/* 3D Floating Elements Visual */}
            <div className="flex-1 relative w-full max-w-lg lg:max-w-xl">
              <div className="relative aspect-square">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-full opacity-50 blur-3xl"></div>

                {/* Main Card */}
                <div className="absolute inset-x-4 inset-y-12 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 flex flex-col justify-between transform transition-transform hover:scale-[1.02] duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <ShieldCheck className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Prescription Verified</h3>
                        <p className="text-xs text-slate-500">Just now</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">APPROVED</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Order Processing</span>
                      <span className="font-bold text-blue-600">75%</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-2xl">
                      <Truck className="h-6 w-6 text-blue-600 mb-2" />
                      <p className="text-xs text-slate-500 font-medium">Estimated Arrival</p>
                      <p className="font-bold text-slate-900">2:00 PM</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-2xl">
                      <Clock className="h-6 w-6 text-purple-600 mb-2" />
                      <p className="text-xs text-slate-500 font-medium">Refill Due</p>
                      <p className="font-bold text-slate-900">In 5 Days</p>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce duration-[3000ms]">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-slate-200"></div>
                      ))}
                    </div>
                    <div className="text-xs font-bold text-slate-700">
                      +500 Pharmacists
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-blue-600 tracking-wide uppercase mb-2">Simple Process</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How PharmaCare Works</h3>
            <p className="text-slate-600 text-lg">Get your medication in 3 simple steps. No hassle, no waiting.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-200 -z-10"></div>

            {[
              {
                step: "01",
                title: "Upload Prescription",
                desc: "Snap a photo of your doctor's prescription and upload it to our secure portal.",
                icon: Upload
              },
              {
                step: "02",
                title: "Pharmacist Review",
                desc: "Our licensed pharmacists verify your prescription for safety and accuracy.",
                icon: ShieldCheck
              },
              {
                step: "03",
                title: "Fast Delivery",
                desc: "We pack your medicines with care and deliver them to your doorstep.",
                icon: Truck
              }
            ].map((item, i) => (
              <div key={i} className="relative bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                  <item.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">Loved by Patients</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Chronic Care Patient",
                text: "PharmaCare has completely changed how I manage my diabetes medication. The auto-refill feature is a lifesaver!"
              },
              {
                name: "Michael Chen",
                role: "Parent",
                text: "When my son got sick late at night, PharmaCare's express delivery got us the meds we needed in under an hour."
              },
              {
                name: "Emily Davis",
                role: "Elderly Caregiver",
                text: "The app is so easy to use. I manage prescriptions for both my parents without any confusion. Highly recommend!"
              }
            ].map((review, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 relative">
                <Quote className="h-10 w-10 text-blue-200 absolute top-6 left-6" />
                <div className="relative z-10 pt-8">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 italic mb-6">"{review.text}"</p>
                  <div>
                    <p className="font-bold text-slate-900">{review.name}</p>
                    <p className="text-sm text-slate-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Your Health Can't Wait.</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Join the digital health revolution today. Secure, fast, and reliable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-white text-slate-900 hover:bg-slate-100 transition-all">
                Get Started Now
              </Button>
            </Link>
            <Link href="/catalog">
              <Button size="lg" variant="outline" className="h-14 px-10 text-lg rounded-full border-slate-700 text-white hover:bg-slate-800 hover:text-white transition-all">
                View Catalog
              </Button>
            </Link>
          </div>
          <p className="mt-8 text-sm text-slate-500">
            © 2025 PharmaCare Inc. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  )
}
