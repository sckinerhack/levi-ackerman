import { connectToDatabase } from "@/lib/mongodb";
import { RedirectLink } from "@/types/redirect";
import { headers } from "next/headers";

interface RedirectPageProps {
  params: {
    uuid: string;
  };
}

export async function generateMetadata({ params }: RedirectPageProps) {
  const { uuid } = params;

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("redirects");

    // Find the redirect link by UUID
    const redirectLink = (await collection.findOne({
      uuid,
    })) as RedirectLink | null;

    if (redirectLink) {
      return {
        metadataBase: new URL(redirectLink.destinationUrl),
        title: "Redirecting...",
        refresh: {
          httpEquiv: "refresh",
          content: `0;url=${redirectLink.destinationUrl}`,
        },
      };
    }
  } catch (error) {
    console.error("Error in generateMetadata:", error);
  }

  return {
    title: "Link Not Found",
  };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { uuid } = params;
  const headersList = headers();
  const userAgent = headersList.get("user-agent") || "";

  try {
    const { db } = await connectToDatabase();
    const collection = db.collection("redirects");

    // Find the redirect link by UUID
    const redirectLink = (await collection.findOne({
      uuid,
    })) as RedirectLink | null;

    if (!redirectLink) {
      // If the redirect link is not found, show a 404 page
      return (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold mb-4">404 - Link Not Found</h1>
          <p className="text-lg mb-8">
            The redirect link you're looking for doesn't exist.
          </p>
          <a
            href="/"
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Go Home
          </a>
        </div>
      );
    }

    // Return a page that redirects using HTML meta refresh
    return (
      <html>
        <head>
          <meta
            httpEquiv="refresh"
            content={`0;url=${redirectLink.destinationUrl}`}
          />
          <title>Redirecting...</title>
        </head>
        <body>
          <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-xl mb-4">Redirecting...</h1>
            <p className="mb-4">
              If you are not redirected automatically, click the link below:
            </p>
            <a
              href={redirectLink.destinationUrl}
              className="text-blue-500 hover:underline"
            >
              {redirectLink.destinationUrl}
            </a>
          </div>
        </body>
      </html>
    );
  } catch (error) {
    console.error("Error redirecting:", error);

    // If there's an error, show an error page
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-lg mb-8">
          There was an error processing your redirect.
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Go Home
        </a>
      </div>
    );
  }
}
