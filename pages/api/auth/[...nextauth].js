import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		// ...add more providers here
	],
	callbacks: {
		async session({ session, token }) {
			// Send properties to the client, like an access_token from a provider.
			session.user.uid = token.sub
			return session
		},
	},
})
