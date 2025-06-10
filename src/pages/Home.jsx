import { useState } from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 bg-white/90 backdrop-blur-md border-b border-surface-200/50 sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-soft">
                <ApperIcon name="CheckSquare" className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gradient">TaskFlow 7</h1>
            </motion.div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-surface-600 hover:text-primary transition-colors duration-200">Features</a>
              <a href="#dashboard" className="text-surface-600 hover:text-primary transition-colors duration-200">Dashboard</a>
              <a href="#productivity" className="text-surface-600 hover:text-primary transition-colors duration-200">Analytics</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleDarkMode}
                className="p-2 sm:p-3 rounded-xl bg-surface-100 hover:bg-surface-200 transition-colors duration-200"
              >
                <ApperIcon name={darkMode ? "Sun" : "Moon"} className="h-4 w-4 sm:h-5 sm:w-5 text-surface-600" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              >
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-16 lg:pt-24 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-bold text-surface-900 mb-4 sm:mb-6"
            >
              Master Your Tasks with
              <span className="block text-gradient">Smart Organization</span>
            </motion.h2>
            
            <motion.p 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-surface-600 max-w-3xl mx-auto leading-relaxed"
            >
              Transform chaos into clarity. Organize, prioritize, and track your tasks with intelligent workflows that adapt to your productivity style.
            </motion.p>
          </div>

          {/* Quick Stats */}
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
          >
            {[
              { icon: "Target", value: "98%", label: "Task Completion Rate" },
              { icon: "Clock", value: "2.5h", label: "Time Saved Daily" },
              { icon: "TrendingUp", value: "150%", label: "Productivity Boost" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="card-glass p-6 sm:p-8 text-center"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name={stat.icon} className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-surface-900 mb-2">{stat.value}</div>
                <div className="text-surface-600 text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Feature Section */}
      <section id="dashboard" className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 mb-4 sm:mb-6">
              Your Personal <span className="text-gradient">Task Command Center</span>
            </h3>
            <p className="text-lg sm:text-xl text-surface-600 max-w-2xl mx-auto">
              Experience task management that feels effortless. Create, organize, and complete tasks with intelligent features designed for modern productivity.
            </p>
          </motion.div>
          
          <MainFeature />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-900 text-surface-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                  <ApperIcon name="CheckSquare" className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-gradient">TaskFlow</h4>
              </div>
              <p className="text-surface-400 max-w-md">
                Empowering individuals and teams to achieve more through intelligent task management and productivity insights.
              </p>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2 text-surface-400">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-surface-400">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-800 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-surface-400 text-sm mb-4 sm:mb-0">
              © 2024 TaskFlow. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {['Twitter', 'Github', 'Linkedin'].map((social) => (
                <a key={social} href="#" className="text-surface-400 hover:text-primary transition-colors">
                  <ApperIcon name={social} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
