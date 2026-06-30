import re
from pathlib import Path

file = Path(r'c:\Users\User\Pictures\CheryV1\src\app\find-your-chery\page.tsx')
text = file.read_text(encoding='utf-8')
old = text

text = text.replace(
    "import { useState } from 'react'",
    "import { useState, useEffect, useRef } from 'react'"
)

text = text.replace(
    "import { ArrowRight, Star, Car } from 'lucide-react'",
    "import { ArrowRight, Star, Car, CheckCircle2 } from 'lucide-react'"
)

text = text.replace(
    "import VehicleCard from '@/components/sections/VehicleCard'",
    "import VehicleCard from '@/components/sections/VehicleCard'\nimport { motion, AnimatePresence } from 'framer-motion'"
)

old_quiz = '''      {\/* Quiz Section *\/}
      {\!showResult ? (
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              {\/* Progress Bar *\/}
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-gray-700">
                    Question {currentStep + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-semibold text-chery-red">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-chery-red h-full rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {\/* Question *\/}
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-scale-in">
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-chery-navy mb-8 text-center">
                  {questions[currentStep].question}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {questions[currentStep].options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                      className={cn(
                        'p-6 rounded-xl border-2 transition-all duration-300 text-left hover:border-chery-red hover:shadow-lg',
                        {
                          'border-chery-red bg-chery-red/5': answers[questions[currentStep].id] === option.value,
                          'border-gray-200 bg-white': answers[questions[currentStep].id] !== option.value,
                        }
                      )}
                    >
                      <div className="flex items-start space-x-4">
                        <span className="text-3xl">{option.emoji}</span>
                        <div>
                          <p className="font-semibold text-chery-navy text-lg">
                            {option.label}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : ('''

old_results = '''      ) : (
        /* Results Section */
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-16 animate-slide-up">
              <div className="w-20 h-20 bg-chery-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-10 w-10 text-chery-red" />
              </div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-chery-navy mb-4">
                Your Perfect Match
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Based on your preferences, we recommend these Chery vehicles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {recommendations.map((vehicle, index) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
              ))}
            </div>

            <div className="text-center space-y-4">
              <button
                onClick={resetQuiz}
                className="btn-secondary inline-flex items-center text-lg"
              >
                Retake Quiz
              </button>
              <p className="text-gray-600">
                Still unsure? <Link href="/contact" className="text-chery-red font-semibold hover:underline">Contact us</Link> for personalized assistance
              </p>
            </div>
          </div>
        </section>
      )}'''

new_quiz = '''      {\/* Quiz Section *\/}
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.section
            key="quiz"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4 }}
            className="relative section-padding overflow-hidden bg-gradient-to-b from-gray-50 via-white to-white"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 left-10 h-72 w-72 rounded-full bg-chery-red/10 blur-3xl" />
              <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-chery-navy/10 blur-3xl" />
            </div>

            <div className="container-custom relative">
              <div className="mx-auto max-w-3xl">
                {\/* Stepper *\/}
                <div className="mb-10">
                  <div className="flex items-center justify-between">
                    {questions.map((q, idx) => (
                      <div key={q.id} className="flex flex-1 flex-col items-center">
                        <div
                          className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300',
                            idx <= currentStep
                              ? 'border-chery-red bg-chery-red text-white shadow-lg shadow-chery-red/20'
                              : 'border-gray-300 bg-white text-gray-500'
                          )}
                        >
                          {idx < currentStep ? <CheckCircle2 className="h-5 w-5" /> : idx + 1}
                        </div>
                        <span className="mt-2 hidden text-xs font-semibold text-gray-500 md:block">
                          Step {idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-chery-red transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {\/* Question Card *\/}
                <div className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-xl backdrop-blur-md md:p-10">
                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-chery-navy mb-8 text-center">
                    {questions[currentStep].question}
                  </h2>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {questions[currentStep].options.map((option) => {
                      const selected = answers[questions[currentStep].id] === option.value;
                      return (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(questions[currentStep].id, option.value)}
                          className={cn(
                            'group flex items-center rounded-2xl border-2 px-6 py-5 text-left transition-all duration-300',
                            selected
                              ? 'border-chery-red bg-chery-red/5 shadow-lg shadow-chery-red/10'
                              : 'border-gray-200 bg-white hover:border-chery-red/60 hover:shadow-md'
                          )}
                        >
                          <span className="mr-4 text-3xl transition-transform duration-300 group-hover:scale-110">
                            {option.emoji}
                          </span>
                          <span className="font-semibold text-chery-navy text-lg">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="results"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="section-padding bg-white"
          >'''

new_results = '''
          </motion.section>
        )}
      </AnimatePresence>'''

if old_quiz in text:
    text = text.replace(old_quiz, new_quiz)
else:
    print('OLD QUIZ NOT FOUND')

if old_results in text:
    text = text.replace(old_results, new_results)
else:
    print('OLD RESULTS NOT FOUND')

file.write_text(text, encoding='utf-8')
print('done')
