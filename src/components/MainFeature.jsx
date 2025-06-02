import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { format, isAfter, isBefore, startOfDay } from 'date-fns'

const MainFeature = () => {
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Finalize the Q4 project proposal with updated budget estimates',
      priority: 'high',
      status: 'in-progress',
      dueDate: new Date(2024, 11, 25),
      projectId: 'work',
      tags: ['urgent', 'client']
    },
    {
      id: '2',
      title: 'Team standup meeting',
      description: 'Weekly team sync to discuss progress and blockers',
      priority: 'medium',
      status: 'pending',
      dueDate: new Date(2024, 11, 24),
      projectId: 'work',
      tags: ['meeting']
    },
    {
      id: '3',
      title: 'Grocery shopping',
      description: 'Buy ingredients for weekend dinner party',
      priority: 'low',
      status: 'pending',
      dueDate: new Date(2024, 11, 23),
      projectId: 'personal',
      tags: ['errands']
    }
  ])

  const [projects] = useState([
    { id: 'work', name: 'Work', color: '#6366f1', icon: 'Briefcase' },
    { id: 'personal', name: 'Personal', color: '#f97316', icon: 'User' },
    { id: 'health', name: 'Health', color: '#06d6a0', icon: 'Heart' }
  ])

  const [activeProject, setActiveProject] = useState('all')
  const [viewMode, setViewMode] = useState('list') // list, board, calendar
  const [sortBy, setSortBy] = useState('dueDate') // dueDate, priority, status
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    projectId: 'work',
    tags: ''
  })

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter(task => activeProject === 'all' || task.projectId === activeProject)
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate) - new Date(b.dueDate)
      }
      if (sortBy === 'priority') {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      if (sortBy === 'status') {
        const statusOrder = { pending: 3, 'in-progress': 2, completed: 1 }
        return statusOrder[b.status] - statusOrder[a.status]
      }
      return 0
    })

  // Task statistics
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    overdue: tasks.filter(t => 
      t.status !== 'completed' && 
      isBefore(new Date(t.dueDate), startOfDay(new Date()))
    ).length
  }

  const handleCreateTask = () => {
    if (!newTask.title.trim()) {
      toast.error('Task title is required')
      return
    }

    const task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: 'pending',
      dueDate: new Date(newTask.dueDate || Date.now()),
      projectId: newTask.projectId,
      tags: newTask.tags ? newTask.tags.split(',').map(tag => tag.trim()) : [],
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setTasks([...tasks, task])
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: '',
      projectId: 'work',
      tags: ''
    })
    setShowTaskForm(false)
    toast.success('Task created successfully!')
  }

  const handleUpdateTask = (taskId, updates) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ))
    
    if (updates.status === 'completed') {
      toast.success('Task completed! 🎉')
    } else {
      toast.success('Task updated successfully')
    }
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    toast.success('Task deleted successfully')
  }

  const getPriorityColor = (priority) => {
    const colors = {
      urgent: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    }
    return colors[priority] || colors.medium
  }

  const getStatusIcon = (status) => {
    const icons = {
      pending: 'Clock',
      'in-progress': 'Play',
      completed: 'CheckCircle'
    }
    return icons[status] || 'Clock'
  }

  const isOverdue = (task) => {
    return task.status !== 'completed' && isBefore(new Date(task.dueDate), startOfDay(new Date()))
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Controls */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 sm:mb-8"
      >
        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Tasks', value: stats.total, icon: 'FileText', color: 'bg-blue-500' },
            { label: 'Completed', value: stats.completed, icon: 'CheckCircle', color: 'bg-green-500' },
            { label: 'Pending', value: stats.pending, icon: 'Clock', color: 'bg-yellow-500' },
            { label: 'Overdue', value: stats.overdue, icon: 'AlertTriangle', color: 'bg-red-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="card-neu p-4 sm:p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-surface-900">{stat.value}</div>
                  <div className="text-sm sm:text-base text-surface-600">{stat.label}</div>
                </div>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          {/* Project Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveProject('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                activeProject === 'all' 
                  ? 'bg-primary text-white shadow-soft' 
                  : 'bg-surface-200 text-surface-700 hover:bg-surface-300'
              }`}
            >
              All Projects
            </motion.button>
            {projects.map(project => (
              <motion.button
                key={project.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveProject(project.id)}
                className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center space-x-2 ${
                  activeProject === project.id 
                    ? 'text-white shadow-soft' 
                    : 'bg-surface-200 text-surface-700 hover:bg-surface-300'
                }`}
                style={{
                  backgroundColor: activeProject === project.id ? project.color : undefined
                }}
              >
                <ApperIcon name={project.icon} className="h-4 w-4" />
                <span className="hidden sm:inline">{project.name}</span>
              </motion.button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field text-sm py-2 px-3 w-auto min-w-0"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
              <option value="status">Sort by Status</option>
            </select>

            {/* View Mode */}
            <div className="flex bg-surface-200 rounded-xl p-1">
              {[
                { mode: 'list', icon: 'List' },
                { mode: 'board', icon: 'Columns' }
              ].map(({ mode, icon }) => (
                <motion.button
                  key={mode}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode(mode)}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === mode 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-surface-600 hover:text-surface-900'
                  }`}
                >
                  <ApperIcon name={icon} className="h-4 w-4" />
                </motion.button>
              ))}
            </div>

            {/* Add Task */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTaskForm(true)}
              className="btn-primary flex items-center space-x-2 text-sm px-4 py-2"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
              <span className="hidden sm:inline">Add Task</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Task Creation Form */}
      <AnimatePresence>
        {showTaskForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTaskForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card-glass max-w-lg w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-surface-900">Create New Task</h3>
                <button
                  onClick={() => setShowTaskForm(false)}
                  className="p-2 rounded-xl bg-surface-200 hover:bg-surface-300 transition-colors"
                >
                  <ApperIcon name="X" className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="input-field"
                    placeholder="Enter task title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">Description</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="input-field resize-none h-24"
                    placeholder="Task description (optional)..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      className="input-field"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Project</label>
                    <select
                      value={newTask.projectId}
                      onChange={(e) => setNewTask({ ...newTask, projectId: e.target.value })}
                      className="input-field"
                    >
                      {projects.map(project => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newTask.tags}
                    onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                    className="input-field"
                    placeholder="urgent, client, meeting..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleCreateTask}
                    className="btn-primary flex-1"
                  >
                    Create Task
                  </button>
                  <button
                    onClick={() => setShowTaskForm(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tasks Display */}
      <AnimatePresence mode="wait">
        {viewMode === 'list' && (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            {filteredTasks.length === 0 ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="card-neu p-12 text-center"
              >
                <div className="w-16 h-16 bg-surface-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ApperIcon name="CheckSquare" className="h-8 w-8 text-surface-400" />
                </div>
                <h3 className="text-xl font-semibold text-surface-700 mb-2">No tasks found</h3>
                <p className="text-surface-500">
                  {activeProject === 'all' 
                    ? "Create your first task to get started!" 
                    : `No tasks in ${projects.find(p => p.id === activeProject)?.name} project`
                  }
                </p>
              </motion.div>
            ) : (
              filteredTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`card-neu p-4 sm:p-6 ${isOverdue(task) ? 'border-l-4 border-red-500' : ''}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Task Status */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleUpdateTask(task.id, { 
                        status: task.status === 'completed' ? 'pending' : 'completed' 
                      })}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        task.status === 'completed' 
                          ? 'bg-green-500 text-white' 
                          : 'border-2 border-surface-300 hover:border-green-500'
                      }`}
                    >
                      {task.status === 'completed' && <ApperIcon name="Check" className="h-4 w-4" />}
                    </motion.button>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                        <div className="flex-1">
                          <h4 className={`font-semibold text-surface-900 ${
                            task.status === 'completed' ? 'line-through opacity-60' : ''
                          }`}>
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-surface-600 text-sm mt-1">{task.description}</p>
                          )}
                          
                          {/* Tags */}
                          {task.tags && task.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {task.tags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 bg-surface-200 text-surface-700 text-xs rounded-lg">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Task Meta */}
                        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                          {/* Priority */}
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
                            <span className="text-xs text-surface-600 capitalize">{task.priority}</span>
                          </div>

                          {/* Due Date */}
                          <div className={`text-xs flex items-center space-x-1 ${
                            isOverdue(task) ? 'text-red-600 font-medium' : 'text-surface-600'
                          }`}>
                            <ApperIcon name="Calendar" className="h-3 w-3" />
                            <span>{format(new Date(task.dueDate), 'MMM dd')}</span>
                          </div>

                          {/* Project */}
                          <div className="flex items-center space-x-1">
                            <div 
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: projects.find(p => p.id === task.projectId)?.color }}
                            />
                            <span className="text-xs text-surface-600">
                              {projects.find(p => p.id === task.projectId)?.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleUpdateTask(task.id, { 
                          status: task.status === 'in-progress' ? 'pending' : 'in-progress' 
                        })}
                        className={`p-2 rounded-lg transition-colors ${
                          task.status === 'in-progress' 
                            ? 'bg-primary text-white' 
                            : 'bg-surface-200 text-surface-600 hover:bg-surface-300'
                        }`}
                      >
                        <ApperIcon name="Play" className="h-4 w-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 rounded-lg bg-surface-200 text-surface-600 hover:bg-red-100 hover:text-red-600 transition-colors"
                      >
                        <ApperIcon name="Trash2" className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {viewMode === 'board' && (
          <motion.div
            key="board"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {['pending', 'in-progress', 'completed'].map(status => {
              const statusTasks = filteredTasks.filter(task => task.status === status)
              const statusLabels = {
                pending: 'To Do',
                'in-progress': 'In Progress',
                completed: 'Completed'
              }
              const statusColors = {
                pending: 'bg-surface-200',
                'in-progress': 'bg-yellow-200',
                completed: 'bg-green-200'
              }

              return (
                <div key={status} className="card-neu p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-surface-900 flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
                      <span>{statusLabels[status]}</span>
                    </h3>
                    <span className="bg-surface-200 text-surface-700 px-2 py-1 rounded-lg text-sm">
                      {statusTasks.length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <AnimatePresence>
                      {statusTasks.map((task, index) => (
                        <motion.div
                          key={task.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ delay: index * 0.05 }}
                          className="bg-white p-4 rounded-xl shadow-soft border border-surface-200"
                        >
                          <h4 className="font-medium text-surface-900 mb-2">{task.title}</h4>
                          {task.description && (
                            <p className="text-surface-600 text-sm mb-3">{task.description}</p>
                          )}
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                              <span className="text-xs text-surface-600">
                                {format(new Date(task.dueDate), 'MMM dd')}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleUpdateTask(task.id, { 
                                  status: status === 'pending' ? 'in-progress' : 
                                         status === 'in-progress' ? 'completed' : 'pending'
                                })}
                                className="p-1 rounded bg-surface-100 hover:bg-surface-200 transition-colors"
                              >
                                <ApperIcon name="ArrowRight" className="h-3 w-3" />
                              </motion.button>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleDeleteTask(task.id)}
                                className="p-1 rounded bg-surface-100 hover:bg-red-100 text-surface-600 hover:text-red-600 transition-colors"
                              >
                                <ApperIcon name="Trash2" className="h-3 w-3" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature