const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

/**
 * The User model is intentionally split conceptually into:
 *  1. Auth fields   - email, password, tokens, verification state
 *  2. Profile fields - the "student profile" (bio, skills, education...)
 *
 * We keep them in ONE document (not two collections) because they are
 * always read together (e.g. rendering a profile page needs both the
 * name/avatar AND the skills/projects). Splitting them would mean an
 * extra query on almost every request for no real benefit at this scale.
 *
 * If the profile sub-documents grow very large (e.g. thousands of
 * projects per user) they should be promoted to their own collection
 * with a userId reference — see the "Project" and "Certification"
 * models for that pattern.
 */

const educationSchema = new Schema(
  {
    institution: { type: String, required: true, trim: true },
    degree: { type: String, trim: true },
    fieldOfStudy: { type: String, trim: true },
    startYear: { type: Number },
    endYear: { type: Number },
    description: { type: String, maxlength: 1000 },
  },
  { _id: true, timestamps: false }
);

const experienceSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    organization: { type: String, required: true, trim: true },
    startDate: { type: Date },
    endDate: { type: Date }, // null => "current"
    description: { type: String, maxlength: 1000 },
  },
  { _id: true, timestamps: false }
);

const certificationSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    issuer: { type: String, trim: true },
    issueDate: { type: Date },
    credentialUrl: { type: String, trim: true },
  },
  { _id: true, timestamps: false }
);

const userSchema = new Schema(
  {
    // ---------- Identity / Auth ----------
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      minlength: 8,
      select: false, // never returned by default in queries
      // required only for local (non-OAuth) accounts - enforced in pre-save hook
    },
    authProvider: {
      type: String,
      enum: ['local', 'google'],
      default: 'local',
    },
    googleId: { type: String, select: false },

    isEmailVerified: { type: Boolean, default: false },
    emailVerificationTokenHash: { type: String, select: false },
    emailVerificationExpires: { type: Date, select: false },

    passwordResetTokenHash: { type: String, select: false },
    passwordResetExpires: { type: Date, select: false },

    refreshTokenHash: { type: String, select: false }, // rotation / revocation support

    role: {
      type: String,
      enum: ['student', 'mentor', 'admin'],
      default: 'student',
    },
    accountStatus: {
      type: String,
      enum: ['active', 'suspended', 'deactivated'],
      default: 'active',
    },

    // ---------- Profile ----------
    avatarUrl: { type: String, default: '' }, // Cloudinary URL
    coverImageUrl: { type: String, default: '' },
    headline: { type: String, maxlength: 120, trim: true }, // e.g. "CS @ MIT | ML enthusiast"
    bio: { type: String, maxlength: 500, trim: true },
    college: { type: String, trim: true, index: true },
    graduationYear: { type: Number },
    location: { type: String, trim: true },

    skills: [{ type: String, trim: true, lowercase: true, index: true }],
    interests: [{ type: String, trim: true, lowercase: true }],
    education: [educationSchema],
    experience: [experienceSchema],
    certifications: [certificationSchema],

    resumeUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    portfolioUrl: { type: String, default: '' },

    // ---------- Mentorship ----------
    isMentor: { type: Boolean, default: false },
    mentorProfile: {
      expertise: [{ type: String, trim: true }],
      yearsOfExperience: { type: Number },
      averageRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },

    // ---------- Social graph (denormalized counts for fast reads) ----------
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
    connectionsCount: { type: Number, default: 0 },

    lastLoginAt: { type: Date },
  },
  { timestamps: true }
);

// ---------- Indexes ----------
// Compound text index powers the "search by skills / college / interests" feature
userSchema.index(
  { name: 'text', headline: 'text', bio: 'text', skills: 'text', college: 'text' },
  { weights: { name: 5, skills: 4, college: 3, headline: 2, bio: 1 } }
);

// ---------- Hooks ----------
userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ---------- Instance methods ----------
userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

// Strip sensitive fields whenever a User document is serialized (res.json)
userSchema.methods.toJSON = function toSafeJSON() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshTokenHash;
  delete obj.emailVerificationTokenHash;
  delete obj.emailVerificationExpires;
  delete obj.passwordResetTokenHash;
  delete obj.passwordResetExpires;
  delete obj.googleId;
  delete obj.__v;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
