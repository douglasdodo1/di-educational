'use client'
import { useCourses } from '@/hooks/courses/useCourses'
import { Course } from '@/types/course'
import { useMemo, useState } from 'react'
import { categories } from './utils'

export const useViewModel = () => {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('Todas categorias')

  const { data, loading, error } = useCourses()

  const courses: Course[] = useMemo(() => {
    if (!data?.Courses) return []

    return data.Courses.map((c: Course) => ({
      id: String(c.id),
      name: c.name,
      description: c.description || '',
      category: 'Programação',
      image: c.image || '',
      progress: Math.floor(Math.random() * 100),
      classes: c.classes ? c.classes.length : 0,
      hours: c.classes ? c.classes.length * 2 : 0,
    }))
  }, [data])

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesQuery =
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.description.toLowerCase().includes(query.toLowerCase())
      const matchesCategory = category === 'Todas categorias' || c.category === category
      return matchesQuery && matchesCategory
    })
  }, [query, category, courses])

  const handleClickCourse = (course: Course) => {
    console.log(course)
  }

  return {
    query,
    setQuery,
    category,
    setCategory,
    filtered,
    loading,
    error,
  }
}
