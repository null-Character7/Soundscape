/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Fsdvz4fyhNO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ScrollArea } from "@/components/ui/scroll-area"

export function Space() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-r from-[#4a90e2] to-[#8e44ad] text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center bg-[#e0e0e0] border-b">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <Music2Icon className="h-6 w-6 fill-[#4a90e2]" />
          <span className="sr-only">Soundscape</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" className="px-4 py-2 rounded-md hover:bg-[#d0d0d0]/10">
            Explore
          </Button>
          <Button variant="ghost" className="px-4 py-2 rounded-md hover:bg-[#d0d0d0]/10">
            My Spaces
          </Button>
          <Button variant="ghost" className="px-4 py-2 rounded-md hover:bg-[#d0d0d0]/10">
            Settings
          </Button>
          <Button variant="outline" className="px-4 py-2 rounded-md border-[#4a90e2] text-[#4a90e2]">
            <LogInIcon className="h-4 w-4 mr-2 fill-[#4a90e2]" />
            Login
          </Button>
        </nav>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 p-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/placeholder.svg"
              width="100"
              height="100"
              alt="Song Thumbnail"
              className="rounded-lg"
              style={{ aspectRatio: "100/100", objectFit: "cover" }}
            />
            <div>
              <h3 className="text-xl font-bold text-[#333333]">Song Title</h3>
              <p className="text-[#333333]">Artist Name</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <RewindIcon className="h-6 w-6 fill-[#4a90e2]" />
            </Button>
            <Button variant="ghost" size="icon">
              <PlayIcon className="h-6 w-6 fill-[#4a90e2]" />
            </Button>
            <Button variant="ghost" size="icon">
              <ForwardIcon className="h-6 w-6 fill-[#4a90e2]" />
            </Button>
            <Slider
              className="flex-1 [&>span:first-child]:h-1 [&>span:first-child]:bg-[#757575] [&_[role=slider]]:bg-[#4a90e2] [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-[#4a90e2] [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
              defaultValue={[40]}
            />
            <Button variant="ghost" size="icon">
              <Volume2Icon className="h-6 w-6 fill-[#4a90e2]" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4 overflow-auto max-h-[80vh]">
          <ScrollArea className="flex-1">
            <div className="grid gap-4">
              <div className="flex items-center justify-between bg-gradient-to-r from-[#4a90e2] to-[#8e44ad] rounded-md p-4">
                <div>
                  <h4 className="text-lg font-bold text-white">Song Title</h4>
                  <p className="text-[#d0d0d0]">Artist Name</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#d0d0d0]">10 Upvotes</span>
                  <Button variant="ghost" size="icon">
                    <ArrowUpIcon className="h-4 w-4 fill-white" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ArrowDownIcon className="h-4 w-4 fill-white" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between bg-gradient-to-r from-[#4a90e2] to-[#8e44ad] rounded-md p-4">
                <div>
                  <h4 className="text-lg font-bold text-white">Song Title</h4>
                  <p className="text-[#d0d0d0]">Artist Name</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#d0d0d0]">15 Upvotes</span>
                  <Button variant="ghost" size="icon">
                    <ArrowUpIcon className="h-4 w-4 fill-white" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ArrowDownIcon className="h-4 w-4 fill-white" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between bg-gradient-to-r from-[#4a90e2] to-[#8e44ad] rounded-md p-4">
                <div>
                  <h4 className="text-lg font-bold text-white">Song Title</h4>
                  <p className="text-[#d0d0d0]">Artist Name</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#d0d0d0]">8 Upvotes</span>
                  <Button variant="ghost" size="icon">
                    <ArrowUpIcon className="h-4 w-4 fill-white" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ArrowDownIcon className="h-4 w-4 fill-white" />
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-[#d0d0d0]">&copy; 2024 Soundscape. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-[#4a90e2]" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-[#4a90e2]" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function ArrowDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  )
}


function ArrowUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}


function ForwardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="15 17 20 12 15 7" />
      <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
    </svg>
  )
}


function LogInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" x2="3" y1="12" y2="12" />
    </svg>
  )
}


function Music2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="18" r="4" />
      <path d="M12 18V2l7 4" />
    </svg>
  )
}


function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}


function RewindIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 19 2 12 11 5 11 19" />
      <polygon points="22 19 13 12 22 5 22 19" />
    </svg>
  )
}


function Volume2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  )
}