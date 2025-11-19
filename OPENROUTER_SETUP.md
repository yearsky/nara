# OpenRouter Setup Guide

This guide explains how to set up OpenRouter API for Nara.ai Voice Chat.

## Quick Start

1. **Get OpenRouter API Key**
   - Go to https://openrouter.ai/keys
   - Sign up or log in
   - Create a new API key
   - Copy the key (starts with `sk-or-v1-...`)

2. **Configure Environment Variables**

### Local Development (.env.local)
```bash
NEXT_PUBLIC_OPENROUTER_KEY=sk-or-v1-your-actual-key-here
NEXT_PUBLIC_AI_MODEL=google/gemini-2.0-flash-exp
```

### Vercel Deployment
In Vercel Dashboard → Your Project → Settings → Environment Variables:
- `NEXT_PUBLIC_OPENROUTER_KEY` = `sk-or-v1-your-actual-key-here`
- `NEXT_PUBLIC_AI_MODEL` = `google/gemini-2.0-flash-exp`

## Model Options

### Free Tier (Recommended)
```bash
NEXT_PUBLIC_AI_MODEL=google/gemini-2.0-flash-exp
```
**No privacy configuration needed!**

### Free Tier with `:free` suffix
```bash
NEXT_PUBLIC_AI_MODEL=google/gemini-2.0-flash-exp:free
```
**⚠️ Requires Privacy Settings Configuration** (see below)

### Premium Models
```bash
NEXT_PUBLIC_AI_MODEL=anthropic/claude-3.5-sonnet
NEXT_PUBLIC_AI_MODEL=openai/gpt-4o
```

## Privacy Settings (For `:free` Models)

If you use models with `:free` suffix (e.g., `google/gemini-2.0-flash-exp:free`), you need to configure privacy settings:

### Step 1: Go to Privacy Settings
Visit: https://openrouter.ai/settings/privacy

### Step 2: Enable Data Policy
You have two options:

**Option A: Allow Training (Free Tier)**
- Check "Allow my requests to be used for training"
- This enables access to `:free` models
- Your data may be used to improve models

**Option B: Use Model Without `:free` Suffix (Recommended)**
- Use `google/gemini-2.0-flash-exp` instead of `google/gemini-2.0-flash-exp:free`
- No privacy configuration needed
- Same free tier access

## Error: "No endpoints found matching your data policy"

If you see this error:
```
No endpoints found matching your data policy (Free model training).
Configure: https://openrouter.ai/settings/privacy
```

**Solution 1 (Easiest):** Remove `:free` suffix
```bash
# Change from:
NEXT_PUBLIC_AI_MODEL=google/gemini-2.0-flash-exp:free

# To:
NEXT_PUBLIC_AI_MODEL=google/gemini-2.0-flash-exp
```

**Solution 2:** Configure Privacy Settings
1. Go to https://openrouter.ai/settings/privacy
2. Enable "Allow training" option
3. Redeploy your application

## Recommended Configuration

For most users, we recommend:

```bash
# OpenRouter API Key (required)
NEXT_PUBLIC_OPENROUTER_KEY=sk-or-v1-your-actual-key-here

# Model Selection (use without :free suffix)
NEXT_PUBLIC_AI_MODEL=google/gemini-2.0-flash-exp

# System Prompt (optional)
NEXT_PUBLIC_SYSTEM_PROMPT="You are Nara, a friendly AI assistant..."

# Whisper API for transcription (optional)
OPENAI_API_KEY=sk-your-openai-key-here
```

## Troubleshooting

### Issue: Invalid API Key
**Error:** `Invalid OpenRouter API key`
**Solution:**
- Check your API key is correct
- Ensure it starts with `sk-or-v1-`
- Generate a new key if needed

### Issue: Rate Limit
**Error:** `Rate limit exceeded`
**Solution:**
- Wait a few minutes
- Upgrade your OpenRouter plan

### Issue: Privacy Policy Error
**Error:** `No endpoints found matching your data policy`
**Solution:**
- Remove `:free` suffix from model name
- Or configure privacy settings

## Cost Information

### Free Tier Models
- `google/gemini-2.0-flash-exp` - **FREE** (1500 requests/day)
- `google/gemini-2.0-flash-exp:free` - **FREE** (requires privacy config)

### Paid Models
- `google/gemini-flash-1.5` - Very cheap (~$0.075/M tokens)
- `anthropic/claude-3.5-sonnet` - Premium (~$15/M tokens)
- `openai/gpt-4o` - Premium (~$10/M tokens)

## Support

For more information:
- OpenRouter Documentation: https://openrouter.ai/docs
- OpenRouter Discord: https://discord.gg/openrouter
- Nara.ai GitHub Issues: [Your GitHub repo]
