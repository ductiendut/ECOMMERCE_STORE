/**
 * Seed script cho dữ liệu mẫu Bandai (phiên bản đơn giản).
 * Mỗi sản phẩm có 2 hình: tên hình thứ 2 chỉ thêm số 1 (hoặc biến thể) phía trước đuôi.
 * Chỉ cần bạn tạo đủ file ảnh tương ứng trong: server/public/<category>/
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/itemsModel');

// DATASET THUẦN: tùy ý đổi tên, giá, mô tả. Chỉ cần giữ đúng cấu trúc.
const sampleItems = [
  // GUNPLA (HG)
  { name: 'HG 1/144 Aerial (WfM)', category: 'gunpla', color: 'multi', type: 'hg', price: 18,
    description: 'High Grade Aerial kit.', size: ['1/144'], highlights: ['High Grade','Color molded'],
    detail: 'Beam rifle, shield & effect parts.', image: [ { filename: 'placeholder-gunpla-aerial.jpg' }, { filename: 'placeholder-gunpla-aerial1.jpg' } ] },
  { name: 'HG 1/144 Lfrith Thorn', category: 'gunpla', color: 'multi', type: 'hg', price: 20,
    description: 'Witch from Mercury unit.', size: ['1/144'], highlights: ['High Grade','New weapon parts'],
    detail: 'Includes rifle & shield.', image: [ { filename: 'placeholder-gunpla-lfriththorn.jpg' }, { filename: 'placeholder-gunpla-lfriththorn1.jpg' } ] },
  { name: 'HG 1/144 Demi Trainer', category: 'gunpla', color: 'green', type: 'hg', price: 14,
    description: 'Mass production trainer.', size: ['1/144'], highlights: ['Army build','Easy build'],
    detail: 'Basic backpack & rifle.', image: [ { filename: 'placeholder-gunpla-demi.jpg' }, { filename: 'placeholder-gunpla-demi1.jpg' } ] },
  { name: 'HG 1/144 Aerial Rebuild', category: 'gunpla', color: 'multi', type: 'hg', price: 22,
    description: 'Upgraded Aerial form.', size: ['1/144'], highlights: ['Updated armor','Effect parts'],
    detail: 'Enhanced shell units.', image: [ { filename: 'placeholder-gunpla-aerialre.jpg' }, { filename: 'placeholder-gunpla-aerialre1.jpg' } ] },
  { name: 'HG 1/144 Schwarzette', category: 'gunpla', color: 'black', type: 'hg', price: 21,
    description: 'Dark stealth mobile suit.', size: ['1/144'], highlights: ['High Grade','Stylish silhouette'],
    detail: 'Includes beam saber & rifle.', image: [ { filename: 'placeholder-gunpla-schwarzette.jpg' }, { filename: 'placeholder-gunpla-schwarzette1.jpg' } ] },
  // GUNPLA (RG)
  { name: 'RG 1/144 God Gundam', category: 'gunpla', color: 'multi', type: 'rg', price: 42,
    description: 'Dynamic articulation RG.', size: ['1/144'], highlights: ['Real Grade','Energy ring'],
    detail: 'Extreme posing frame.', image: [ { filename: 'placeholder-gunpla-godrg.jpg' }, { filename: 'placeholder-gunpla-godrg1.jpg' } ] },
  { name: 'RG 1/144 Sazabi', category: 'gunpla', color: 'red', type: 'rg', price: 58,
    description: 'Neo Zeon flagship.', size: ['1/144'], highlights: ['Real Grade','Weapons loadout'],
    detail: 'Heavy armor inner frame.', image: [ { filename: 'placeholder-gunpla-sazabi.jpg' }, { filename: 'placeholder-gunpla-sazabi1.jpg' } ] },
  { name: 'RG 1/144 Wing Gundam Zero EW', category: 'gunpla', color: 'white', type: 'rg', price: 46,
    description: 'Angel wing design.', size: ['1/144'], highlights: ['Transformation','Real Grade'],
    detail: 'Endless Waltz style.', image: [ { filename: 'placeholder-gunpla-wingzero.jpg' }, { filename: 'placeholder-gunpla-wingzero1.jpg' } ] },
  { name: 'RG 1/144 Destiny Gundam', category: 'gunpla', color: 'multi', type: 'rg', price: 49,
    description: 'SEED Destiny unit.', size: ['1/144'], highlights: ['Real Grade','Wings of light'],
    detail: 'Advanced joint system.', image: [ { filename: 'placeholder-gunpla-destiny.jpg' }, { filename: 'placeholder-gunpla-destiny1.jpg' } ] },
  // GUNPLA (MG / MGEX)
  { name: 'MG 1/100 Strike Freedom Gundam', category: 'gunpla', color: 'multi', type: 'mg', price: 60,
    description: 'DRAGOON system MG.', size: ['1/100'], highlights: ['Master Grade','Gold frame'],
    detail: 'Large wing span.', image: [ { filename: 'placeholder-gunpla-strikefreedom.jpg' }, { filename: 'placeholder-gunpla-strikefreedom1.jpg' } ] },
  { name: 'MG 1/100 Barbatos', category: 'gunpla', color: 'white', type: 'mg', price: 54,
    description: 'IBO mechanical frame.', size: ['1/100'], highlights: ['Inner frame','Mace weapon'],
    detail: 'Piston gimmicks.', image: [ { filename: 'placeholder-gunpla-barbatos.jpg' }, { filename: 'placeholder-gunpla-barbatos1.jpg' } ] },
  { name: 'MG 1/100 Zaku II 2.0', category: 'gunpla', color: 'green', type: 'mg', price: 45,
    description: 'Classic mono-eye.', size: ['1/100'], highlights: ['Flexible hoses','Weapons variety'],
    detail: 'Highly poseable frame.', image: [ { filename: 'placeholder-gunpla-zaku2.jpg' }, { filename: 'placeholder-gunpla-zaku21.jpg' } ] },
  { name: 'MG 1/100 RX-78-2 Ver.3.0', category: 'gunpla', color: 'multi', type: 'mg', price: 48,
    description: 'Ver.3.0 engineering.', size: ['1/100'], highlights: ['Panel detail','Articulation'],
    detail: 'Realistic panel lining.', image: [ { filename: 'placeholder-gunpla-rx78v3.jpg' }, { filename: 'placeholder-gunpla-rx78v31.jpg' } ] },
  { name: 'MG 1/100 Jesta', category: 'gunpla', color: 'navy', type: 'mg', price: 52,
    description: 'Elite task force.', size: ['1/100'], highlights: ['Realistic loadout','Shield'],
    detail: 'Tactical styling.', image: [ { filename: 'placeholder-gunpla-jesta.jpg' }, { filename: 'placeholder-gunpla-jesta1.jpg' } ] },
  { name: 'MGEX 1/100 Unicorn Gundam', category: 'gunpla', color: 'white', type: 'mgex', price: 165,
    description: 'Extreme psycho-frame.', size: ['1/100'], highlights: ['MGEX','Transformation'],
    detail: 'Unicorn ↔ Destroy.', image: [ { filename: 'placeholder-gunpla-mgex-unicorn.jpg' }, { filename: 'placeholder-gunpla-mgex-unicorn1.jpg' } ] },
  // LIMITED / ENTRY
  { name: 'P-Bandai Exclusive Kit (Sample)', category: 'gunpla', color: 'exclusive', type: 'limited', price: 95,
    description: 'Limited production slot.', size: ['1/100'], highlights: ['Collector item','Limited run'],
    detail: 'Placeholder variant.', image: [ { filename: 'placeholder-gunpla-pbandai.jpg' }, { filename: 'placeholder-gunpla-pbandai1.jpg' } ] },
  { name: 'Entry Grade 1/144 RX-78-2', category: 'gunpla', color: 'multi', type: 'entry', price: 10,
    description: 'Beginner friendly EG.', size: ['1/144'], highlights: ['Tool-less','Good articulation'],
    detail: 'Great for new builders.', image: [ { filename: 'placeholder-gunpla-entry-rx78.jpg' }, { filename: 'placeholder-gunpla-entry-rx781.jpg' } ] },
  // FIGURES
  { name: 'SHF Ultraman Decker', category: 'figure', color: 'silver', type: 'action-figure', price: 62,
    description: 'Articulated hero figure.', size: ['Approx 15cm'], highlights: ['Effect parts','Dynamic joints'],
    detail: 'High pose range.', image: [ { filename: 'placeholder-figure-ultraman.jpg' }, { filename: 'placeholder-figure-ultraman1.jpg' } ] },
  { name: 'SHF Dragon Ball Goku (Base)', category: 'figure', color: 'orange', type: 'action-figure', price: 50,
    description: 'Base form Goku.', size: ['Approx 14cm'], highlights: ['Interchangeable faces','Effect hands'],
    detail: 'Fight pose ready.', image: [ { filename: 'placeholder-figure-goku.jpg' }, { filename: 'placeholder-figure-goku1.jpg' } ] },
  { name: 'SHF Kamen Rider Geats Magnum Boost', category: 'figure', color: 'white', type: 'action-figure', price: 55,
    description: 'Rider articulated figure.', size: ['Approx 15cm'], highlights: ['Multiple hands','High articulation'],
    detail: 'Premium paint.', image: [ { filename: 'placeholder-figure-geats.jpg' }, { filename: 'placeholder-figure-geats1.jpg' } ] },
  // MODEL KITS
  { name: 'Figure-rise Standard Kamen Rider Build', category: 'modelkit', color: 'multi', type: 'character-kit', price: 32,
    description: 'Character model kit.', size: ['Approx 1/12'], highlights: ['Poseable','Color separation'],
    detail: 'Great companion to figures.', image: [ { filename: 'placeholder-modelkit-build.jpg' }, { filename: 'placeholder-modelkit-build1.jpg' } ] },
  { name: '30 Minutes Sisters Tiasha Color B', category: 'modelkit', color: 'blue', type: '30ms', price: 28,
    description: 'Customizable female kit.', size: ['Approx 1/12'], highlights: ['Interchangeable face','Hair options'],
    detail: 'Highly modular.', image: [ { filename: 'placeholder-modelkit-tiasha.jpg' }, { filename: 'placeholder-modelkit-tiasha1.jpg' } ] },
  { name: '30 Minutes Missions Spinatio Knight', category: 'modelkit', color: 'grey', type: '30mm', price: 22,
    description: 'Modular 30MM unit.', size: ['1/144 scale-ish'], highlights: ['Modular armor','Compatible ports'],
    detail: 'Great for kitbashing.', image: [ { filename: 'placeholder-modelkit-spinatio.jpg' }, { filename: 'placeholder-modelkit-spinatio1.jpg' } ] },
  // ACCESSORIES / TOOLS
  { name: 'Action Base 5 (Clear)', category: 'accessory', color: 'clear', type: 'display-base', price: 9,
    description: 'Adjustable display stand.', size: ['Base'], highlights: ['Multiple arms','Stability'],
    detail: 'Great for aerial poses.', image: [ { filename: 'placeholder-accessory-base5.jpg' }, { filename: 'placeholder-accessory-base51.jpg' } ] },
  { name: 'Panel Line Marker (Gray)', category: 'accessory', color: 'gray', type: 'panel-liner', price: 4,
    description: 'Gray panel lining pen.', size: ['Pen'], highlights: ['Capillary action','Erasable'],
    detail: 'Enhances details.', image: [ { filename: 'placeholder-accessory-panel-gray.jpg' }, { filename: 'placeholder-accessory-panel-gray1.jpg' } ] },
  { name: 'Decal Sheet Caution Marks', category: 'accessory', color: 'multi', type: 'decals', price: 6,
    description: 'Water slide decals.', size: ['Sheet'], highlights: ['Fine detail','Professional look'],
    detail: 'Adds realism.', image: [ { filename: 'placeholder-accessory-decals.jpg' }, { filename: 'placeholder-accessory-decals1.jpg' } ] },
  { name: 'Plastic Nippers Basic', category: 'accessory', color: 'blue', type: 'tool', price: 15,
    description: 'Entry level nipper.', size: ['Tool'], highlights: ['Affordable','Clean cuts'],
    detail: 'Good for beginners.', image: [ { filename: 'placeholder-accessory-nipper.jpg' }, { filename: 'placeholder-accessory-nipper1.jpg' } ] },
  { name: 'Surface Primer Gray Spray', category: 'accessory', color: 'gray', type: 'spray', price: 11,
    description: 'Primer for plastic.', size: ['Can'], highlights: ['Even coat','Adhesion'],
    detail: 'Pre-paint prep.', image: [ { filename: 'placeholder-accessory-primer.jpg' }, { filename: 'placeholder-accessory-primer1.jpg' } ] },
  { name: 'Photo-Etch Upgrade Set (Sample)', category: 'accessory', color: 'metal', type: 'photo-etch', price: 22,
    description: 'Detail-up parts.', size: ['Set'], highlights: ['High detail','Enhances surfaces'],
    detail: 'For advanced customization.', image: [ { filename: 'placeholder-accessory-photoetch.jpg' }, { filename: 'placeholder-accessory-photoetch1.jpg' } ] },
  { name: 'Modeling Brush Detail Fine', category: 'accessory', color: 'black', type: 'brush', price: 7,
    description: 'Fine detail brush.', size: ['Brush'], highlights: ['Good control','Synthetic'],
    detail: 'Great for accents.', image: [ { filename: 'placeholder-accessory-brush.jpg' }, { filename: 'placeholder-accessory-brush1.jpg' } ] },
  { name: 'Gundam Marker Set Basic Colors', category: 'accessory', color: 'multi', type: 'marker-set', price: 12,
    description: 'Basic color markers.', size: ['Set'], highlights: ['Fast drying','Beginner friendly'],
    detail: 'Enhances surface finish.', image: [ { filename: 'placeholder-accessory-markerset.jpg' }, { filename: 'placeholder-accessory-markerset1.jpg' } ] }
];

async function run(){
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    const args = process.argv.slice(2);
    const force = args.includes('--force');
    const append = args.includes('--append');
    const existing = await Item.countDocuments({ category: { $in: ['gunpla','figure','modelkit','accessory'] } });
    console.log('Existing items:', existing);

    if(force){
      await Item.deleteMany({ category: { $in: ['gunpla','figure','modelkit','accessory'] } });
      await Item.insertMany(sampleItems);
      console.log('Force reseeded', sampleItems.length, 'items.');
    } else if(append){
      const names = new Set((await Item.find({}, 'name')).map(i => i.name));
      const toInsert = sampleItems.filter(i => !names.has(i.name));
      if(toInsert.length){
        await Item.insertMany(toInsert);
        console.log('Appended', toInsert.length, 'items.');
      } else {
        console.log('No new items to append.');
      }
    } else if(existing === 0){
      await Item.insertMany(sampleItems);
      console.log('Inserted initial', sampleItems.length, 'items.');
    } else {
      console.log('Items already exist. Use --force or --append.');
    }
  } catch (e){
    console.error(e);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

run();