import { DbConnect } from '@/lib/DbConnect'
import User from '@/models/user.model'
import { verifyWebhook } from '@clerk/nextjs/webhooks'

export async function POST(req) {
  try {
    const evt = await verifyWebhook(req)
    const eventType = evt.type

    if (
      eventType === 'user.created' ||
      eventType === 'user.updated' ||
      eventType === 'user.deleted'
    ) {
      await DbConnect();

      if (eventType === 'user.deleted') {
        const clerkId = evt.data.id;
        try {
          await User.findOneAndDelete({ clerkId });
          console.log("User deleted with Clerk ID: " + clerkId);
        } catch (error) {
          console.error("Error deleting user:", error);
        }
        return new Response('User deleted handled', { status: 200 });
      }

      const email = evt?.data?.email_addresses?.[0]?.email_address;
      if (!email) {
        console.log("Email not found in payload");
        return new Response("Missing email in user.created/updated", { status: 400 });
      }

      const userPayload = {
        clerkId: evt.data.id,
        email,
        profilepic: evt.data.image_url,
        firstname: evt.data.first_name,
      };

      try {
        if (eventType === 'user.created') {
          const existing = await User.findOne({ clerkId:evt.data.id});
          if (existing) {
            console.log("User already exists");
            return new Response('User already exists', { status: 200 });
          }

          await User.create(userPayload);
          console.log("User created with email: " + email);
        }

        if (eventType === 'user.updated') {
          await User.findOneAndUpdate({ email }, userPayload);
          console.log("User updated with email: " + email);
        }
      } catch (error) {
        console.error("Error during user sync:", error);
      }
    }
    
    return new Response('Webhook received', { status: 200 });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }
}
