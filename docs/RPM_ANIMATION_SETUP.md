# Ready Player Me Animation Integration Guide

## 📚 Overview

Nara sekarang support RPM (Ready Player Me) animations dari official animation library. Component baru `Nara3DAvatarAnimated` menggabungkan:
- ✅ Emotion-based procedural animations
- ✅ RPM talking variations (facial & body)
- ✅ Fallback ke procedural jika animations tidak tersedia
- ✅ Responsive camera untuk mobile & desktop

---

## 🎬 Available RPM Animations

### Feminine Animations (Recommended for Nara)
Dari: https://github.com/readyplayerme/animation-library/tree/master/feminine/fbx/expression

**Talking Variations (6 files):**
- `F_Talking_Variations_001.fbx` - Casual talking
- `F_Talking_Variations_002.fbx` - Expressive talking
- `F_Talking_Variations_003.fbx` - Gentle talking
- `F_Talking_Variations_004.fbx` - Animated talking
- `F_Talking_Variations_005.fbx` - Emphatic talking
- `F_Talking_Variations_006.fbx` - Subtle talking

---

## 📥 Step-by-Step Setup

### Step 1: Download Animations

**Option A: Manual Download (Recommended)**
1. Buka: https://github.com/readyplayerme/animation-library
2. Navigate ke: `feminine/fbx/expression/`
3. Download file FBX yang diinginkan (klik file → Download)
4. Minimal download 2-3 untuk variety

**Option B: Git Clone (All animations)**
```bash
cd /tmp
git clone https://github.com/readyplayerme/animation-library.git
cp animation-library/feminine/fbx/expression/*.fbx /home/user/nara/public/animations/
```

### Step 2: Place Files

Create animations directory dan copy files:
```bash
mkdir -p /home/user/nara/public/animations
```

Copy downloaded FBX files ke folder tersebut:
```
public/
  └── animations/
      ├── F_Talking_Variations_001.fbx
      ├── F_Talking_Variations_002.fbx
      ├── F_Talking_Variations_003.fbx
      └── ... (other animations)
```

### Step 3: Convert FBX to GLTF (Optional but Recommended)

**Why?** GLTF files are smaller and load faster than FBX.

**Using Online Tools:**
1. Go to: https://products.aspose.app/3d/conversion/fbx-to-gltf
2. Upload your FBX file
3. Download the converted GLB/GLTF
4. Place in `/public/animations/`

**Using Blender (Advanced):**
```bash
# Install Blender
sudo apt install blender  # or download from blender.org

# Convert FBX to GLTF via command line
blender --background --python - <<EOF
import bpy
bpy.ops.import_scene.fbx(filepath='/path/to/animation.fbx')
bpy.ops.export_scene.gltf(filepath='/path/to/animation.gltf')
EOF
```

### Step 4: Update Component

**Option A: Use New Animated Component (Easy)**
Replace `Nara3DAvatarEnhanced` with `Nara3DAvatarAnimated`:

```typescript
// In Nara3DCanvas.tsx or Nara3DCanvasFullScreen.tsx
import { Nara3DAvatarAnimated } from "./Nara3DAvatarAnimated";

// Replace:
<Nara3DAvatarEnhanced fullScreen={false} />

// With:
<Nara3DAvatarAnimated fullScreen={false} />
```

**Option B: Add More Animations (Advanced)**
Edit `Nara3DAvatarAnimated.tsx`:

```typescript
// Load additional animations
const talkingAnim1 = useFBX("/animations/F_Talking_Variations_001.fbx");
const talkingAnim2 = useFBX("/animations/F_Talking_Variations_002.fbx");
const talkingAnim3 = useFBX("/animations/F_Talking_Variations_003.fbx");
const happyAnim = useFBX("/animations/F_Happy_Expression.fbx"); // if available

// Add to combined animations
const animations = React.useMemo(() => {
  const combinedAnims = [...(modelAnimations || [])];

  if (talkingAnim1.animations.length > 0) combinedAnims.push(...talkingAnim1.animations);
  if (talkingAnim2.animations.length > 0) combinedAnims.push(...talkingAnim2.animations);
  if (talkingAnim3.animations.length > 0) combinedAnims.push(...talkingAnim3.animations);

  return combinedAnims;
}, [modelAnimations, talkingAnim1, talkingAnim2, talkingAnim3]);
```

---

## 🎮 How It Works

### Animation Priority System

```typescript
1. Speaking State (isSpeaking = true)
   ↓
   Try RPM Talking Animation
   ↓ (if not found)
   Fallback to Procedural Head Bob

2. Idle State (isSpeaking = false)
   ↓
   Try Model Idle Animation
   ↓ (if not found)
   Fallback to Procedural Breathing
```

### Emotion Integration

Emotions tetap mengontrol procedural animation parameters:

```typescript
happy: {
  rotationIntensity: 0.20,  // More energetic
  floatIntensity: 0.05,
  floatSpeed: 1.2
}

thinking: {
  rotationIntensity: 0.08,  // Minimal movement
  floatIntensity: 0.02,
  floatSpeed: 0.5
}
```

### Trigger Animations

```typescript
// In your code, trigger speaking:
useNaraEmotionStore.getState().setIsSpeaking(true);

// Change emotion:
useNaraEmotionStore.getState().setEmotion('happy');
```

---

## 🔧 Configuration Options

### Animation Settings

Edit dalam `Nara3DAvatarAnimated.tsx`:

```typescript
// Animation fade duration
talkingAction.fadeIn(0.3)  // 300ms fade in
talkingAction.fadeOut(0.3) // 300ms fade out

// Loop mode
talkingAction.setLoop(THREE.LoopRepeat, Infinity) // Loop forever

// Play speed
talkingAction.setEffectiveTimeScale(1.0) // 1.0 = normal speed, 0.5 = half speed
```

### Multiple Talking Variations

Untuk random variation setiap kali bicara:

```typescript
// Add this in the isSpeaking effect:
const talkingVariations = [
  'F_Talking_Variations_001',
  'F_Talking_Variations_002',
  'F_Talking_Variations_003',
];

const randomTalking = talkingVariations[Math.floor(Math.random() * talkingVariations.length)];
const talkingAction = actions[randomTalking];

if (talkingAction) {
  talkingAction.reset().fadeIn(0.3).play();
}
```

---

## 📊 Performance Considerations

### File Sizes

| Format | Size (avg) | Load Time | Quality |
|--------|-----------|-----------|---------|
| FBX | ~500KB | Slower | High |
| GLTF/GLB | ~200KB | Fast | High |
| Compressed GLB | ~100KB | Fastest | Good |

**Recommendation:** Convert FBX → GLB with Draco compression

### Loading Strategy

**Current:** Eager loading (all animations load on component mount)

**Better:** Lazy loading animations
```typescript
// Only load when needed
const [loadTalking, setLoadTalking] = useState(false);

useEffect(() => {
  if (isSpeaking) {
    setLoadTalking(true);
  }
}, [isSpeaking]);

const talkingAnim = useFBX(loadTalking ? "/animations/talking.fbx" : null);
```

---

## 🐛 Troubleshooting

### Animation Not Playing

**Check 1:** File exists
```bash
ls -lh public/animations/
```

**Check 2:** Animation loaded
```typescript
console.log('Available actions:', Object.keys(actions));
```

**Check 3:** Animation name matches
```typescript
// Check animation clip names
animations.forEach(clip => console.log('Clip name:', clip.name));
```

### FBX Loading Error

**Error:** `Failed to load FBX`

**Solutions:**
1. Check file path (case-sensitive!)
2. Try converting to GLTF
3. Use smaller file (<5MB)

### Animation Too Fast/Slow

```typescript
// Adjust playback speed
action.setEffectiveTimeScale(0.8) // 80% speed
```

### Memory Issues

**If too many animations:**
```typescript
// Unload unused animations
useEffect(() => {
  return () => {
    mixer?.stopAllAction();
    mixer?.uncacheRoot(groupRef.current);
  };
}, [mixer]);
```

---

## 🎨 Advanced: Mixamo Integration

RPM avatars are compatible dengan Mixamo animations!

### Steps:

1. **Export RPM Avatar:**
   - Go to ReadyPlayerMe
   - Download your avatar GLB

2. **Upload to Mixamo:**
   - Go to: https://www.mixamo.com
   - Upload GLB
   - Auto-rig will process

3. **Download Animations:**
   - Browse Mixamo library
   - Select animation (Talking, Idle, Happy, etc)
   - Download as FBX
   - Without skin (animation only)

4. **Use in Nara:**
   ```typescript
   const mixamoAnim = useFBX("/animations/mixamo_talking.fbx");
   ```

**Popular Mixamo Animations for Nara:**
- Talking (multiple variations)
- Idle
- Waving
- Thinking
- Happy
- Excited

---

## 📝 Migration Checklist

Switching from `Nara3DAvatarEnhanced` to `Nara3DAvatarAnimated`:

- [ ] Download 2-3 RPM talking animations
- [ ] Place in `/public/animations/`
- [ ] (Optional) Convert FBX to GLB
- [ ] Update import in canvas components
- [ ] Test speaking animation: `setIsSpeaking(true)`
- [ ] Test emotion states still work
- [ ] Test mobile responsive (kepala kelihatan)
- [ ] Build and deploy

---

## 🚀 Quick Start (TL;DR)

```bash
# 1. Download animations
wget https://github.com/readyplayerme/animation-library/raw/master/feminine/fbx/expression/F_Talking_Variations_001.fbx -P public/animations/
wget https://github.com/readyplayerme/animation-library/raw/master/feminine/fbx/expression/F_Talking_Variations_002.fbx -P public/animations/

# 2. Update component
# Replace Nara3DAvatarEnhanced with Nara3DAvatarAnimated in:
# - components/nara/Nara3DCanvas.tsx
# - components/nara/Nara3DCanvasFullScreen.tsx

# 3. Build
npm run build

# 4. Test
npm run dev
# Open console: useNaraEmotionStore.getState().setIsSpeaking(true)
```

---

## 💡 Future Enhancements

Potential improvements:

1. **Emotion-Specific Animations**
   - Happy expression animation
   - Thinking pose animation
   - Curious head tilt animation

2. **Lip Sync**
   - Integrate with speech audio
   - Real-time mouth movement
   - Using Viseme data

3. **Gesture Library**
   - Wave on greeting
   - Thumbs up for encouragement
   - Nod for agreement

4. **Context-Aware Animations**
   - Different animation per module (Aksara, Verse, etc)
   - Cultural gestures (Indonesian manners)

---

## 📚 Resources

- [RPM Animation Library](https://github.com/readyplayerme/animation-library)
- [Mixamo](https://www.mixamo.com)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js AnimationMixer](https://threejs.org/docs/#api/en/animation/AnimationMixer)
- [FBX to GLTF Converter](https://products.aspose.app/3d/conversion/fbx-to-gltf)

---

## ✅ Current Status

- ✅ Responsive camera (mobile + desktop)
- ✅ Emotion system working
- ✅ Procedural animations as fallback
- ✅ RPM animation support ready
- ⏳ Waiting for animation files to be added

**Next:** Download animations and test!
