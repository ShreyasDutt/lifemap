import { DbConnect } from '@/lib/DbConnect'
import User from '@/models/user.model'
import { verifyWebhook } from '@clerk/nextjs/webhooks'

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type

    if (evt.type === 'user.created' || evt.type === 'user.updated' || evt.type === 'user.deleted') {
      await DbConnect();
      const email = evt?.data?.email_addresses[0]?.email_address;

      if (!email) {
        return console.log("Email not found in evt payload")
      }
      const userPayload = {
        clerkId: evt.data.id,
        username: evt.data.username,
        email: email,
        profilepic: evt.data.image_url,
        firstname: evt.data.first_name,
        lastname: evt.data.last_name,
      };

      try {
        if (evt.type === 'user.created') {
          const FoundUser = await User.findOne({ email });
          if (FoundUser) return console.log("User already exists");

          await User.create(userPayload);
          console.log("User created with Email: " + email);
        }

        if (evt.type === 'user.updated') {
          await User.findOneAndUpdate({ email }, userPayload);
          console.log("User updated with Email: " + email);
        }

          if (evt.type === 'user.deleted') {
          await User.findOneAndDelete({ email });
          console.log("User Deleted with Email: " + email);
        }
      } catch (error) {
        console.error("Error during user sync:", error);
      }
    }

    
    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}