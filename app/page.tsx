'use client'

import type React from 'react'
import {useState} from 'react'
import {Search, ExternalLink, Github, AlertCircle} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'

import {Alert, AlertDescription} from '@/components/ui/alert'

export default function LinkedJob() {
  const [position, setPosition] = useState('')
  const [seniority, setSeniority] = useState('')
  const [workMode, setWorkMode] = useState('')
  const [datePosted, setDatePosted] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const seniorityMap: {[key: string]: string} = {
      Estágio: 'Estágio',
      Júnior: 'Junior',
      Pleno: 'Pleno',
      Sênior: 'Senior',
    }

    let keywords = position.trim()

    const allSeniorities = ['Estágio', 'Junior', 'Pleno', 'Senior']
    if (seniority && seniority !== 'all' && seniorityMap[seniority]) {
      const selectedSeniority = seniorityMap[seniority]
      allSeniorities.forEach((s) => {
        if (s !== selectedSeniority) {
          keywords += ` NOT ${s}`
        }
      })
    }

    const params = new URLSearchParams()
    params.set('keywords', keywords)
    if (datePosted && datePosted !== 'any') params.set('f_TPR', datePosted)

    const wtMap: {[key: string]: string} = {
      Remoto: '2',
      Presencial: '1',
      Híbrido: '3',
    }

    if (workMode && workMode !== 'all' && wtMap[workMode]) {
      params.set('f_WT', wtMap[workMode])
    }

    const linkedinURL = `https://www.linkedin.com/jobs/search/?${params.toString()}`
    window.open(linkedinURL, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2 pb-6">
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-2">
              <Search className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">Linked Job</CardTitle>
            <CardDescription className="text-slate-600">Encontre oportunidades no LinkedIn com filtros inteligentes</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cargo" className="text-sm font-medium text-slate-700">
                  Cargo
                </Label>
                <Input
                  id="cargo"
                  type="text"
                  placeholder="Ex: Desenvolvedor Frontend"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="senioridade" className="text-sm font-medium text-slate-700">
                  Senioridade
                </Label>
                <Select value={seniority} onValueChange={setSeniority}>
                  <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Estágio">Estágio</SelectItem>
                    <SelectItem value="Júnior">Júnior</SelectItem>
                    <SelectItem value="Pleno">Pleno</SelectItem>
                    <SelectItem value="Sênior">Sênior</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="modalidade" className="text-sm font-medium text-slate-700">
                  Modalidade
                </Label>
                <Select value={workMode} onValueChange={setWorkMode}>
                  <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Selecione a modalidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas</SelectItem>
                    <SelectItem value="Presencial">Presencial</SelectItem>
                    <SelectItem value="Remoto">Remoto</SelectItem>
                    <SelectItem value="Híbrido">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="data" className="text-sm font-medium text-slate-700">
                  Data do anúncio
                </Label>
                <Select value={datePosted} onValueChange={setDatePosted}>
                  <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Qualquer data</SelectItem>
                    <SelectItem value="r3600">Última hora</SelectItem>
                    <SelectItem value="r86400">Últimas 24 horas</SelectItem>
                    <SelectItem value="r604800">Última semana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 transition-colors duration-200">
                <Search className="w-4 h-4 mr-2" />
                Buscar Vagas
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <Alert className="border-amber-200 bg-amber-50">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800 text-sm">
                O LinkedIn pode ignorar parcialmente filtros com <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">NOT</code> no campo de busca. Revise os resultados
                manualmente para garantir precisão.
              </AlertDescription>
            </Alert>

            <div className="flex items-center justify-center pt-4 border-t border-slate-100">
              <a
                href="https://github.com/jhonbergmann/linked-job"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-200 text-sm"
              >
                <Github className="w-4 h-4" />
                <span className="font-medium">jhonbergmann/linked-job</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
