import Link from 'next/link'

const CustomLink = (props: any) => {
  const { href } = props
  if (href.startsWith('#')) {
    return <a {...props} />
  }
  if (!href.startsWith('/')) {
    props = {
      target: '_blank',
      rel: 'noopener noreferrer',
      ...props
    }
  }

  return <Link {...props} className="underline-offset-[3px] hover:underline hover:text-black"
  />
}

export default CustomLink
