export async function GET() {
  return Response.json({
    permissions: ['/info/intro']
  })
}