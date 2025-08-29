
import GithubAccessTokenEmail from "../../../components/email-message/GithubAccessTokenEmail";
import { Resend } from 'resend';



const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
    
  try {
    const {username} = await req.json()
    // Check if API key is configured
    if (!process.env.RESEND_API_KEY) {
      return Response.json({ 
        error: 'RESEND_API_KEY is not configured. Please add it to your environment variables.' 
      }, { status: 500 });
    }

      const { data, error } = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: ['abdokhaled766@gmail.com'],
          subject: 'Order Delivered - Your Course is Ready!',
          react: <GithubAccessTokenEmail username={username} />, 

      })
    if (error) {
      console.error('Resend API error:', error);
      return Response.json({ error: error.message || 'Failed to send email' }, { status: 500 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    console.error('Email sending error:', error);
    return Response.json({ 
      error: error.message || 'Internal server error while sending email' 
    }, { status: 500 });
  }
}