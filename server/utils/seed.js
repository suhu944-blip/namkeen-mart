import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { connectDB } from '../config/db.js';

export const seedDatabase = async () => {
  try {
    console.log('🌱 Checking seed data...');

    // 1. Seed Admin User
    const adminExists = await User.findOne({ email: 'admin@namkeenmart.com' });
    if (!adminExists) {
      await User.create({
        name: 'Store Admin',
        email: 'admin@namkeenmart.com',
        mobile: '9876543210',
        password: 'AdminPassword123!',
        role: 'admin',
        isActive: true,
      });
      console.log('✅ Admin user created: admin@namkeenmart.com / AdminPassword123!');
    }

    // 2. Seed Demo Customer User
    const customerExists = await User.findOne({ email: 'customer@namkeenmart.com' });
    if (!customerExists) {
      await User.create({
        name: 'Rahul Sharma',
        email: 'customer@namkeenmart.com',
        mobile: '9876543211',
        password: 'Customer123!',
        role: 'customer',
        isActive: true,
      });
      console.log('✅ Demo customer created: customer@namkeenmart.com / Customer123!');
    }

    // 3. Seed Default Categories if none exist
    const categoryCount = await Category.countDocuments();
    if (categoryCount === 0) {
      const bakeryCategory = await Category.create({
        name: 'Bakery',
        description: 'Crispy kharis, butter toasts, puffs, and artisanal savory baked snacks.',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
        isActive: true,
      });

      const farariCategory = await Category.create({
        name: 'Farari',
        description: 'Traditional fasting-friendly snacks prepared with pure sendha namak and fresh peanuts.',
        image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
        isActive: true,
      });

      const dietCategory = await Category.create({
        name: 'Diet',
        description: 'Healthy roasted munchies, crunchy lotus seeds, and zero-cholesterol light chivdas.',
        image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop&q=80',
        isActive: true,
      });

      console.log('✅ Default categories seeded (Bakery, Farari, Diet)');

      // 4. Seed Initial Products
      await Product.create([
        // Bakery Snacks
        {
          name: 'Special Ratlami Sev',
          description: 'Spicy clove-infused chickpea flour noodles handcrafted with traditional Malwi spices.',
          category: bakeryCategory._id,
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
          price: 140,
          stock: 45,
          availabilityStatus: 'in_stock',
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'Classic Bikaneri Bhujia',
          description: 'Crispy, crispy moth bean and gram flour strands with a touch of royal cardamom and black pepper.',
          category: bakeryCategory._id,
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
          price: 155,
          stock: 30,
          availabilityStatus: 'in_stock',
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'Pure Butter Maskati Khari',
          description: 'Ultra-light, flaky layered puff pastry biscuits baked to golden perfection with amul butter.',
          category: bakeryCategory._id,
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80',
          price: 120,
          stock: 25,
          availabilityStatus: 'in_stock',
          isFeatured: false,
          isActive: true,
        },

        // Farari Snacks
        {
          name: 'Royal Farari Chevdo',
          description: 'Crispy potato crisps blended with fried whole cashews, raisins, peanuts, and pure rock salt.',
          category: farariCategory._id,
          image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
          price: 165,
          stock: 40,
          availabilityStatus: 'in_stock',
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'Crispy Farari Banana Chips',
          description: 'Thinly sliced Kerala raw bananas cooked in cold-pressed oil and dusted with rock salt.',
          category: farariCategory._id,
          image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281699?w=800&auto=format&fit=crop&q=80',
          price: 130,
          stock: 50,
          availabilityStatus: 'in_stock',
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'Sweet & Spicy Sabudana Mixture',
          description: 'Crunchy tapioca pearls tossed with curry leaves, crushed peanuts, and cumin.',
          category: farariCategory._id,
          image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?w=800&auto=format&fit=crop&q=80',
          price: 145,
          stock: 20,
          availabilityStatus: 'in_stock',
          isFeatured: false,
          isActive: true,
        },

        // Diet Snacks
        {
          name: 'Roasted Peri Peri Makhana',
          description: 'Fox nuts gently slow-roasted and tossed in a tangy, zesty peri peri herb seasoning.',
          category: dietCategory._id,
          image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop&q=80',
          price: 195,
          stock: 35,
          availabilityStatus: 'in_stock',
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'Light Roasted Poha Chivda',
          description: 'Diet-friendly beaten rice flakes dry roasted with green chilies, turmeric, and mustard seeds.',
          category: dietCategory._id,
          image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
          price: 125,
          stock: 40,
          availabilityStatus: 'in_stock',
          isFeatured: true,
          isActive: true,
        },
        {
          name: 'Crispy Spiced Soya Sticks',
          description: 'High-protein soya dough crisps flavored with tangy mint and amchur seasoning.',
          category: dietCategory._id,
          image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
          price: 140,
          stock: 30,
          availabilityStatus: 'in_stock',
          isFeatured: false,
          isActive: true,
        },
      ]);
      console.log('✅ Initial products seeded successfully');
    }

    console.log('🎉 Seed check complete.');
  } catch (err) {
    console.error('❌ Seeding failed:', err.message);
  }
};

// Allow standalone execution: `node utils/seed.js`
if (process.argv[1].endsWith('seed.js')) {
  (async () => {
    await connectDB();
    await seedDatabase();
    await mongoose.connection.close();
    process.exit(0);
  })();
}
