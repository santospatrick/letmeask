# Let me ask
> 💬 Realtime Q&A app made with React and Firebase

![Letmeask homepage](docs/letmeask.png)

## Development

1. Install dependencies

```
yarn
yarn dev
```

2. duplicate `.env.example` into `.env.local` fulfulling variables as needed

## Production

1. Install Firebase CLI to deploy

```bash
yarn global add firebase-tools
firebase login # enter your credentials
yarn build
firebase deploy
```