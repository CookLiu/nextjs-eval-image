import fs from 'fs'
import path from 'path'

const evalDictorty = path.join(process.cwd(), '/public/evals/')

export default async (req, res) => {
//   const fileName = req.ref
  const data = req.body
  const picName = req.body.picName 
  const filePath = path.join(evalDictorty, picName)
  const fileNames = fs.writeFileSync(filePath, JSON.stringify(data))

  return res.status(201).json({ data, error: '' })
}
