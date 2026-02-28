/**
 * Arabic Pseudowords for Yes/No Vocabulary Test
 *
 * Based on Paul Nation's Yes/No test methodology, pseudowords are
 * non-words that follow the phonological rules of the target language.
 * They help control for guessing by measuring false alarm rate.
 *
 * These pseudowords are created by:
 * 1. Using valid Arabic root patterns with non-existent combinations
 * 2. Following Arabic morphological patterns (وزن/wazn)
 * 3. Using valid Arabic letters in plausible combinations
 *
 * A learner who claims to know many pseudowords is likely guessing,
 * allowing for score correction.
 */

export interface Pseudoword {
  id: string;
  word: string;
  /** The pattern it follows (to make it look authentic) */
  pattern: string;
}

/**
 * Pseudowords following Form I verb patterns (فَعَلَ)
 * Roots: ز-ب-ح, ق-ث-م, د-ه-ل, ن-ط-ش, ح-ب-ث, ج-م-ث, ص-ل-ث, ت-ب-غ, ك-ش-ذ, ل-ح-ذ
 *        غ-ث-ب, ض-ل-ث, ث-ب-غ, ظ-ن-ث, ذ-م-ح, خ-ث-ل, ث-ر-ذ, ذ-ب-ث, غ-ل-ذ, ض-ث-م
 *        ث-ج-ذ, ذ-ص-ث, خ-ب-ذ, ث-ك-غ, ظ-ب-ث, غ-ث-ص, ذ-ج-ث, ث-ض-ذ, خ-ث-ذ, ذ-ث-غ
 */
export const pseudowordVerbs: Pseudoword[] = [
  // Original 10
  { id: 'pw-gen-001', word: 'زَبَحَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-002', word: 'قَثَمَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-003', word: 'دَهَلَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-004', word: 'نَطَشَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-005', word: 'حَبَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-006', word: 'جَمَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-007', word: 'صَلَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-008', word: 'تَبَغَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-009', word: 'كَشَذَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-010', word: 'لَحَذَ', pattern: 'فَعَلَ' },
  // New Form I verbs (20 more)
  { id: 'pw-gen-031', word: 'غَثَبَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-032', word: 'ضَلَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-033', word: 'ثَبَغَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-034', word: 'ظَنَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-035', word: 'ذَمَحَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-036', word: 'خَثَلَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-037', word: 'ثَرَذَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-038', word: 'ذَبَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-039', word: 'غَلَذَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-040', word: 'ضَثَمَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-041', word: 'ثَجَذَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-042', word: 'ذَصَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-043', word: 'خَبَذَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-044', word: 'ثَكَغَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-045', word: 'ظَبَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-046', word: 'غَثَصَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-047', word: 'ذَجَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-048', word: 'ثَضَذَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-049', word: 'خَثَذَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-050', word: 'ذَثَغَ', pattern: 'فَعَلَ' },
  // Expansion: 50 more Form I verbs (pw-gen-123 to pw-gen-172)
  { id: 'pw-gen-123', word: 'ثَظَغَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-124', word: 'ذَضَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-125', word: 'غَظَذَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-126', word: 'ضَذَغَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-127', word: 'ثَغَضَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-128', word: 'ظَثَذَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-129', word: 'غَضَظَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-130', word: 'ذَغَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-131', word: 'ضَثَظَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-132', word: 'ظَذَضَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-133', word: 'ثَذَضَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-134', word: 'غَثَظَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-135', word: 'ذَظَغَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-136', word: 'ضَغَذَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-137', word: 'ظَضَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-138', word: 'ثَضَغَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-139', word: 'ذَثَظَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-140', word: 'غَذَضَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-141', word: 'ضَظَذَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-142', word: 'ظَغَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-143', word: 'ثَظَضَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-144', word: 'ذَغَظَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-145', word: 'غَضَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-146', word: 'ضَذَظَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-147', word: 'ظَثَغَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-148', word: 'خَذَظَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-149', word: 'طَثَذَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-150', word: 'صَذَثَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-151', word: 'حَثَظَ', pattern: 'فَعَلَ' },
  { id: 'pw-gen-152', word: 'جَثَذَ', pattern: 'فَعِلَ' },
  { id: 'pw-gen-153', word: 'ثَغَظَ', pattern: 'فَعِلَ' },
  { id: 'pw-gen-154', word: 'ذَضَغَ', pattern: 'فَعِلَ' },
  { id: 'pw-gen-155', word: 'غَظَثَ', pattern: 'فَعِلَ' },
  { id: 'pw-gen-156', word: 'ضَثَغَ', pattern: 'فَعِلَ' },
  { id: 'pw-gen-157', word: 'ظَذَثَ', pattern: 'فَعِلَ' },
  { id: 'pw-gen-158', word: 'ثَضَظَ', pattern: 'فَعِلَ' },
  { id: 'pw-gen-159', word: 'ذَغَضَ', pattern: 'فَعِلَ' },
  { id: 'pw-gen-160', word: 'غَثَضَ', pattern: 'فَعِلَ' },
  { id: 'pw-gen-161', word: 'ضَظَثَ', pattern: 'فَعِلَ' },
  { id: 'pw-gen-162', word: 'ثَظَذَ', pattern: 'فَعُلَ' },
  { id: 'pw-gen-163', word: 'ذَضَظَ', pattern: 'فَعُلَ' },
  { id: 'pw-gen-164', word: 'غَذَثَ', pattern: 'فَعُلَ' },
  { id: 'pw-gen-165', word: 'ضَغَظَ', pattern: 'فَعُلَ' },
  { id: 'pw-gen-166', word: 'ظَثَضَ', pattern: 'فَعُلَ' },
  { id: 'pw-gen-167', word: 'خَظَثَ', pattern: 'فَعُلَ' },
  { id: 'pw-gen-168', word: 'طَذَظَ', pattern: 'فَعُلَ' },
  { id: 'pw-gen-169', word: 'صَثَظَ', pattern: 'فَعُلَ' },
  { id: 'pw-gen-170', word: 'حَذَثَ', pattern: 'فَعُلَ' },
  { id: 'pw-gen-171', word: 'جَظَذَ', pattern: 'فَعُلَ' },
  { id: 'pw-gen-172', word: 'ثَذَغَ', pattern: 'فَعَلَ' },
];

/**
 * Pseudowords following derived verb patterns (Forms II-X)
 * These use non-existent roots applied to higher verb form patterns.
 */
export const pseudowordVerbsDerived: Pseudoword[] = [
  // Form II (فَعَّلَ)
  { id: 'pw-gen-051', word: 'زَبَّحَ', pattern: 'فَعَّلَ' },
  { id: 'pw-gen-052', word: 'ثَبَّغَ', pattern: 'فَعَّلَ' },
  { id: 'pw-gen-053', word: 'ذَمَّحَ', pattern: 'فَعَّلَ' },
  { id: 'pw-gen-054', word: 'غَثَّبَ', pattern: 'فَعَّلَ' },
  // Form III (فَاعَلَ)
  { id: 'pw-gen-055', word: 'قَاثَمَ', pattern: 'فَاعَلَ' },
  { id: 'pw-gen-056', word: 'ضَالَثَ', pattern: 'فَاعَلَ' },
  { id: 'pw-gen-057', word: 'خَاثَلَ', pattern: 'فَاعَلَ' },
  { id: 'pw-gen-058', word: 'ذَابَثَ', pattern: 'فَاعَلَ' },
  // Form IV (أَفْعَلَ)
  { id: 'pw-gen-059', word: 'أَزْبَحَ', pattern: 'أَفْعَلَ' },
  { id: 'pw-gen-060', word: 'أَثْبَغَ', pattern: 'أَفْعَلَ' },
  { id: 'pw-gen-061', word: 'أَذْمَحَ', pattern: 'أَفْعَلَ' },
  // Form V (تَفَعَّلَ)
  { id: 'pw-gen-062', word: 'تَزَبَّحَ', pattern: 'تَفَعَّلَ' },
  { id: 'pw-gen-063', word: 'تَغَثَّبَ', pattern: 'تَفَعَّلَ' },
  { id: 'pw-gen-064', word: 'تَخَثَّلَ', pattern: 'تَفَعَّلَ' },
  // Form VI (تَفَاعَلَ)
  { id: 'pw-gen-065', word: 'تَقَاثَمَ', pattern: 'تَفَاعَلَ' },
  { id: 'pw-gen-066', word: 'تَذَابَثَ', pattern: 'تَفَاعَلَ' },
  // Form VII (اِنْفَعَلَ)
  { id: 'pw-gen-067', word: 'اِنْزَبَحَ', pattern: 'اِنْفَعَلَ' },
  { id: 'pw-gen-068', word: 'اِنْثَبَغَ', pattern: 'اِنْفَعَلَ' },
  // Form VIII (اِفْتَعَلَ)
  { id: 'pw-gen-069', word: 'اِزْتَبَحَ', pattern: 'اِفْتَعَلَ' },
  { id: 'pw-gen-070', word: 'اِخْتَثَلَ', pattern: 'اِفْتَعَلَ' },
  // Form X (اِسْتَفْعَلَ)
  { id: 'pw-gen-071', word: 'اِسْتَزْبَحَ', pattern: 'اِسْتَفْعَلَ' },
  { id: 'pw-gen-072', word: 'اِسْتَغْثَبَ', pattern: 'اِسْتَفْعَلَ' },
  // Expansion: 38 more derived verb forms (pw-gen-173 to pw-gen-210)
  // Form II (فَعَّلَ)
  { id: 'pw-gen-173', word: 'ثَظَّغَ', pattern: 'فَعَّلَ' },
  { id: 'pw-gen-174', word: 'ذَضَّثَ', pattern: 'فَعَّلَ' },
  { id: 'pw-gen-175', word: 'غَظَّذَ', pattern: 'فَعَّلَ' },
  { id: 'pw-gen-176', word: 'ضَذَّغَ', pattern: 'فَعَّلَ' },
  { id: 'pw-gen-177', word: 'ظَثَّذَ', pattern: 'فَعَّلَ' },
  // Form III (فَاعَلَ)
  { id: 'pw-gen-178', word: 'ثَاظَغَ', pattern: 'فَاعَلَ' },
  { id: 'pw-gen-179', word: 'ذَاضَثَ', pattern: 'فَاعَلَ' },
  { id: 'pw-gen-180', word: 'غَاظَذَ', pattern: 'فَاعَلَ' },
  { id: 'pw-gen-181', word: 'ضَاذَغَ', pattern: 'فَاعَلَ' },
  { id: 'pw-gen-182', word: 'ظَاثَذَ', pattern: 'فَاعَلَ' },
  // Form IV (أَفْعَلَ)
  { id: 'pw-gen-183', word: 'أَثْظَغَ', pattern: 'أَفْعَلَ' },
  { id: 'pw-gen-184', word: 'أَذْضَثَ', pattern: 'أَفْعَلَ' },
  { id: 'pw-gen-185', word: 'أَغْظَذَ', pattern: 'أَفْعَلَ' },
  { id: 'pw-gen-186', word: 'أَضْذَغَ', pattern: 'أَفْعَلَ' },
  { id: 'pw-gen-187', word: 'أَظْثَذَ', pattern: 'أَفْعَلَ' },
  // Form V (تَفَعَّلَ)
  { id: 'pw-gen-188', word: 'تَثَظَّغَ', pattern: 'تَفَعَّلَ' },
  { id: 'pw-gen-189', word: 'تَذَضَّثَ', pattern: 'تَفَعَّلَ' },
  { id: 'pw-gen-190', word: 'تَغَظَّذَ', pattern: 'تَفَعَّلَ' },
  { id: 'pw-gen-191', word: 'تَضَذَّغَ', pattern: 'تَفَعَّلَ' },
  // Form VI (تَفَاعَلَ)
  { id: 'pw-gen-192', word: 'تَثَاظَغَ', pattern: 'تَفَاعَلَ' },
  { id: 'pw-gen-193', word: 'تَذَاضَثَ', pattern: 'تَفَاعَلَ' },
  { id: 'pw-gen-194', word: 'تَغَاظَذَ', pattern: 'تَفَاعَلَ' },
  { id: 'pw-gen-195', word: 'تَضَاذَغَ', pattern: 'تَفَاعَلَ' },
  // Form VII (اِنْفَعَلَ)
  { id: 'pw-gen-196', word: 'اِنْثَظَغَ', pattern: 'اِنْفَعَلَ' },
  { id: 'pw-gen-197', word: 'اِنْذَضَثَ', pattern: 'اِنْفَعَلَ' },
  { id: 'pw-gen-198', word: 'اِنْغَظَذَ', pattern: 'اِنْفَعَلَ' },
  { id: 'pw-gen-199', word: 'اِنْضَذَغَ', pattern: 'اِنْفَعَلَ' },
  // Form VIII (اِفْتَعَلَ)
  { id: 'pw-gen-200', word: 'اِثْتَظَغَ', pattern: 'اِفْتَعَلَ' },
  { id: 'pw-gen-201', word: 'اِذْتَضَثَ', pattern: 'اِفْتَعَلَ' },
  { id: 'pw-gen-202', word: 'اِغْتَظَذَ', pattern: 'اِفْتَعَلَ' },
  { id: 'pw-gen-203', word: 'اِضْتَذَغَ', pattern: 'اِفْتَعَلَ' },
  // Form IX (اِفْعَلَّ)
  { id: 'pw-gen-204', word: 'اِثْظَغَّ', pattern: 'اِفْعَلَّ' },
  { id: 'pw-gen-205', word: 'اِذْضَثَّ', pattern: 'اِفْعَلَّ' },
  // Form X (اِسْتَفْعَلَ)
  { id: 'pw-gen-206', word: 'اِسْتَثْظَغَ', pattern: 'اِسْتَفْعَلَ' },
  { id: 'pw-gen-207', word: 'اِسْتَذْضَثَ', pattern: 'اِسْتَفْعَلَ' },
  { id: 'pw-gen-208', word: 'اِسْتَغْظَذَ', pattern: 'اِسْتَفْعَلَ' },
  { id: 'pw-gen-209', word: 'اِسْتَضْذَغَ', pattern: 'اِسْتَفْعَلَ' },
  { id: 'pw-gen-210', word: 'اِسْتَظْثَذَ', pattern: 'اِسْتَفْعَلَ' },
];

/**
 * Pseudowords following noun patterns (فَعْل، فِعَال، etc.)
 * Expanded to cover more morphological templates.
 */
export const pseudowordNouns: Pseudoword[] = [
  // Original 10
  { id: 'pw-gen-011', word: 'زَبْح', pattern: 'فَعْل' },
  { id: 'pw-gen-012', word: 'قِثَام', pattern: 'فِعَال' },
  { id: 'pw-gen-013', word: 'دُهُول', pattern: 'فُعُول' },
  { id: 'pw-gen-014', word: 'مَنْطَش', pattern: 'مَفْعَل' },
  { id: 'pw-gen-015', word: 'حَبِيثَة', pattern: 'فَعِيلَة' },
  { id: 'pw-gen-016', word: 'جِمَاثَة', pattern: 'فِعَالَة' },
  { id: 'pw-gen-017', word: 'صَلْثَان', pattern: 'فَعْلَان' },
  { id: 'pw-gen-018', word: 'تَبَاغُر', pattern: 'فَعَالُل' },
  { id: 'pw-gen-019', word: 'كُشَاذ', pattern: 'فُعَال' },
  { id: 'pw-gen-020', word: 'لِحَاذَة', pattern: 'فِعَالَة' },
  // New nouns (20 more)
  { id: 'pw-gen-073', word: 'غَثْب', pattern: 'فَعْل' },
  { id: 'pw-gen-074', word: 'ضِلَاث', pattern: 'فِعَال' },
  { id: 'pw-gen-075', word: 'ثُبُوغ', pattern: 'فُعُول' },
  { id: 'pw-gen-076', word: 'مَذْمَح', pattern: 'مَفْعَل' },
  { id: 'pw-gen-077', word: 'خَثِيلَة', pattern: 'فَعِيلَة' },
  { id: 'pw-gen-078', word: 'ذِبَاثَة', pattern: 'فِعَالَة' },
  { id: 'pw-gen-079', word: 'غَلْذَان', pattern: 'فَعْلَان' },
  { id: 'pw-gen-080', word: 'ضُثَام', pattern: 'فُعَال' },
  { id: 'pw-gen-081', word: 'ثَجْذ', pattern: 'فَعْل' },
  { id: 'pw-gen-082', word: 'ذِصَاث', pattern: 'فِعَال' },
  { id: 'pw-gen-083', word: 'خُبُوذ', pattern: 'فُعُول' },
  { id: 'pw-gen-084', word: 'مَثْكَغ', pattern: 'مَفْعَل' },
  { id: 'pw-gen-085', word: 'ظَبِيثَة', pattern: 'فَعِيلَة' },
  { id: 'pw-gen-086', word: 'غِثَاصَة', pattern: 'فِعَالَة' },
  { id: 'pw-gen-087', word: 'ذَجْثَان', pattern: 'فَعْلَان' },
  { id: 'pw-gen-088', word: 'ثُضَاذ', pattern: 'فُعَال' },
  { id: 'pw-gen-089', word: 'خَثْذ', pattern: 'فَعْل' },
  { id: 'pw-gen-090', word: 'ذُثُوغ', pattern: 'فُعُول' },
  { id: 'pw-gen-091', word: 'مَغْثَص', pattern: 'مَفْعَل' },
  { id: 'pw-gen-092', word: 'ثَضِيذَة', pattern: 'فَعِيلَة' },
  // Expansion: 30 more nouns (pw-gen-211 to pw-gen-240)
  { id: 'pw-gen-211', word: 'ثَظْغ', pattern: 'فَعْل' },
  { id: 'pw-gen-212', word: 'ذِضَاث', pattern: 'فِعَال' },
  { id: 'pw-gen-213', word: 'غُظُوذ', pattern: 'فُعُول' },
  { id: 'pw-gen-214', word: 'مَضْذَغ', pattern: 'مَفْعَل' },
  { id: 'pw-gen-215', word: 'ظَثِيذَة', pattern: 'فَعِيلَة' },
  { id: 'pw-gen-216', word: 'ثِغَاضَة', pattern: 'فِعَالَة' },
  { id: 'pw-gen-217', word: 'ذَضْثَان', pattern: 'فَعْلَان' },
  { id: 'pw-gen-218', word: 'غُظَاذ', pattern: 'فُعَال' },
  { id: 'pw-gen-219', word: 'ضَذْغ', pattern: 'فَعْل' },
  { id: 'pw-gen-220', word: 'ظِذَاض', pattern: 'فِعَال' },
  { id: 'pw-gen-221', word: 'ثُغُوض', pattern: 'فُعُول' },
  { id: 'pw-gen-222', word: 'مَظْثَذ', pattern: 'مَفْعَل' },
  { id: 'pw-gen-223', word: 'ذَغِيظَة', pattern: 'فَعِيلَة' },
  { id: 'pw-gen-224', word: 'ضِذَاغَة', pattern: 'فِعَالَة' },
  { id: 'pw-gen-225', word: 'غَضْظَان', pattern: 'فَعْلَان' },
  { id: 'pw-gen-226', word: 'ثُظَاغ', pattern: 'فُعَال' },
  { id: 'pw-gen-227', word: 'خَذْظ', pattern: 'فَعْل' },
  { id: 'pw-gen-228', word: 'طِثَاذ', pattern: 'فِعَال' },
  { id: 'pw-gen-229', word: 'صُذُوث', pattern: 'فُعُول' },
  { id: 'pw-gen-230', word: 'مَحْثَظ', pattern: 'مَفْعَل' },
  { id: 'pw-gen-231', word: 'جَثِيذَة', pattern: 'فَعِيلَة' },
  { id: 'pw-gen-232', word: 'خِذَاظَة', pattern: 'فِعَالَة' },
  { id: 'pw-gen-233', word: 'طَثْذَان', pattern: 'فَعْلَان' },
  { id: 'pw-gen-234', word: 'صُذَاث', pattern: 'فُعَال' },
  { id: 'pw-gen-235', word: 'حَثْظ', pattern: 'فَعْل' },
  { id: 'pw-gen-236', word: 'جِثَاذ', pattern: 'فِعَال' },
  { id: 'pw-gen-237', word: 'ثُضُوغ', pattern: 'فُعُول' },
  { id: 'pw-gen-238', word: 'مَذْغَظ', pattern: 'مَفْعَل' },
  { id: 'pw-gen-239', word: 'غَظِيثَة', pattern: 'فَعِيلَة' },
  { id: 'pw-gen-240', word: 'ظِثَاغَة', pattern: 'فِعَالَة' },
];

/**
 * Pseudowords following adjective patterns (فَعِيل، أَفْعَل، etc.)
 * Expanded to cover more adjective templates.
 */
export const pseudowordAdjectives: Pseudoword[] = [
  // Original 10
  { id: 'pw-gen-021', word: 'زَبِيح', pattern: 'فَعِيل' },
  { id: 'pw-gen-022', word: 'قَثِيم', pattern: 'فَعِيل' },
  { id: 'pw-gen-023', word: 'أَدْهَل', pattern: 'أَفْعَل' },
  { id: 'pw-gen-024', word: 'مَنْطُوش', pattern: 'مَفْعُول' },
  { id: 'pw-gen-025', word: 'حَابِث', pattern: 'فَاعِل' },
  { id: 'pw-gen-026', word: 'مُجْمِث', pattern: 'مُفْعِل' },
  { id: 'pw-gen-027', word: 'صَلْثَاء', pattern: 'فَعْلَاء' },
  { id: 'pw-gen-028', word: 'مُتَبَغِّر', pattern: 'مُتَفَعِّل' },
  { id: 'pw-gen-029', word: 'كَشُوذ', pattern: 'فَعُول' },
  { id: 'pw-gen-030', word: 'لَحِيذ', pattern: 'فَعِيل' },
  // New adjectives (10 more)
  { id: 'pw-gen-093', word: 'غَثِيب', pattern: 'فَعِيل' },
  { id: 'pw-gen-094', word: 'أَضْلَث', pattern: 'أَفْعَل' },
  { id: 'pw-gen-095', word: 'مَذْمُوح', pattern: 'مَفْعُول' },
  { id: 'pw-gen-096', word: 'خَاثِل', pattern: 'فَاعِل' },
  { id: 'pw-gen-097', word: 'مُغْثِب', pattern: 'مُفْعِل' },
  { id: 'pw-gen-098', word: 'ذَبْثَاء', pattern: 'فَعْلَاء' },
  { id: 'pw-gen-099', word: 'مُتَخَثِّل', pattern: 'مُتَفَعِّل' },
  { id: 'pw-gen-100', word: 'ثَبُوغ', pattern: 'فَعُول' },
  { id: 'pw-gen-101', word: 'ظَنِيث', pattern: 'فَعِيل' },
  { id: 'pw-gen-102', word: 'أَغْلَذ', pattern: 'أَفْعَل' },
  // Expansion: 20 more adjectives (pw-gen-241 to pw-gen-260)
  { id: 'pw-gen-241', word: 'ثَظِيغ', pattern: 'فَعِيل' },
  { id: 'pw-gen-242', word: 'أَذْضَث', pattern: 'أَفْعَل' },
  { id: 'pw-gen-243', word: 'مَغْظُوذ', pattern: 'مَفْعُول' },
  { id: 'pw-gen-244', word: 'ضَاذِغ', pattern: 'فَاعِل' },
  { id: 'pw-gen-245', word: 'مُظْثِذ', pattern: 'مُفْعِل' },
  { id: 'pw-gen-246', word: 'ثَغْضَاء', pattern: 'فَعْلَاء' },
  { id: 'pw-gen-247', word: 'مُتَذَضِّث', pattern: 'مُتَفَعِّل' },
  { id: 'pw-gen-248', word: 'ذَضُوث', pattern: 'فَعُول' },
  { id: 'pw-gen-249', word: 'غَظِيذ', pattern: 'فَعِيل' },
  { id: 'pw-gen-250', word: 'أَضْذَغ', pattern: 'أَفْعَل' },
  { id: 'pw-gen-251', word: 'مَثْظُوغ', pattern: 'مَفْعُول' },
  { id: 'pw-gen-252', word: 'ظَاثِذ', pattern: 'فَاعِل' },
  { id: 'pw-gen-253', word: 'مُذْضِث', pattern: 'مُفْعِل' },
  { id: 'pw-gen-254', word: 'غَظْذَاء', pattern: 'فَعْلَاء' },
  { id: 'pw-gen-255', word: 'مُتَثَظِّغ', pattern: 'مُتَفَعِّل' },
  { id: 'pw-gen-256', word: 'ضَذُوغ', pattern: 'فَعُول' },
  { id: 'pw-gen-257', word: 'خَذِيظ', pattern: 'فَعِيل' },
  { id: 'pw-gen-258', word: 'أَطْثَذ', pattern: 'أَفْعَل' },
  { id: 'pw-gen-259', word: 'مَصْذُوث', pattern: 'مَفْعُول' },
  { id: 'pw-gen-260', word: 'حَاثِظ', pattern: 'فَاعِل' },
];

/**
 * Pseudowords following masdar/verbal noun patterns
 * These cover Form II-X verbal noun templates.
 */
export const pseudowordMasdars: Pseudoword[] = [
  // Form II masdar (تَفْعِيل)
  { id: 'pw-gen-103', word: 'تَزْبِيح', pattern: 'تَفْعِيل' },
  { id: 'pw-gen-104', word: 'تَغْثِيب', pattern: 'تَفْعِيل' },
  { id: 'pw-gen-105', word: 'تَخْثِيل', pattern: 'تَفْعِيل' },
  { id: 'pw-gen-106', word: 'تَذْمِيح', pattern: 'تَفْعِيل' },
  // Form III masdar (مُفَاعَلَة)
  { id: 'pw-gen-107', word: 'مُقَاثَمَة', pattern: 'مُفَاعَلَة' },
  { id: 'pw-gen-108', word: 'مُضَالَثَة', pattern: 'مُفَاعَلَة' },
  { id: 'pw-gen-109', word: 'مُذَابَثَة', pattern: 'مُفَاعَلَة' },
  { id: 'pw-gen-110', word: 'مُخَاثَلَة', pattern: 'مُفَاعَلَة' },
  // Form IV masdar (إِفْعَال)
  { id: 'pw-gen-111', word: 'إِزْبَاح', pattern: 'إِفْعَال' },
  { id: 'pw-gen-112', word: 'إِثْبَاغ', pattern: 'إِفْعَال' },
  { id: 'pw-gen-113', word: 'إِذْمَاح', pattern: 'إِفْعَال' },
  // Form V masdar (تَفَعُّل)
  { id: 'pw-gen-114', word: 'تَزَبُّح', pattern: 'تَفَعُّل' },
  { id: 'pw-gen-115', word: 'تَغَثُّب', pattern: 'تَفَعُّل' },
  { id: 'pw-gen-116', word: 'تَخَثُّل', pattern: 'تَفَعُّل' },
  // Form VI masdar (تَفَاعُل)
  { id: 'pw-gen-117', word: 'تَقَاثُم', pattern: 'تَفَاعُل' },
  { id: 'pw-gen-118', word: 'تَذَابُث', pattern: 'تَفَاعُل' },
  // Form X masdar (اِسْتِفْعَال)
  { id: 'pw-gen-119', word: 'اِسْتِزْبَاح', pattern: 'اِسْتِفْعَال' },
  { id: 'pw-gen-120', word: 'اِسْتِغْثَاب', pattern: 'اِسْتِفْعَال' },
  // Form VII masdar (اِنْفِعَال)
  { id: 'pw-gen-121', word: 'اِنْزِبَاح', pattern: 'اِنْفِعَال' },
  // Form VIII masdar (اِفْتِعَال)
  { id: 'pw-gen-122', word: 'اِزْتِبَاح', pattern: 'اِفْتِعَال' },
  // Expansion: 20 more masdars (pw-gen-261 to pw-gen-280)
  // Form II masdar (تَفْعِيل)
  { id: 'pw-gen-261', word: 'تَثْظِيغ', pattern: 'تَفْعِيل' },
  { id: 'pw-gen-262', word: 'تَذْضِيث', pattern: 'تَفْعِيل' },
  { id: 'pw-gen-263', word: 'تَغْظِيذ', pattern: 'تَفْعِيل' },
  { id: 'pw-gen-264', word: 'تَضْذِيغ', pattern: 'تَفْعِيل' },
  // Form III masdar (مُفَاعَلَة)
  { id: 'pw-gen-265', word: 'مُثَاظَغَة', pattern: 'مُفَاعَلَة' },
  { id: 'pw-gen-266', word: 'مُذَاضَثَة', pattern: 'مُفَاعَلَة' },
  { id: 'pw-gen-267', word: 'مُغَاظَذَة', pattern: 'مُفَاعَلَة' },
  // Form IV masdar (إِفْعَال)
  { id: 'pw-gen-268', word: 'إِثْظَاغ', pattern: 'إِفْعَال' },
  { id: 'pw-gen-269', word: 'إِذْضَاث', pattern: 'إِفْعَال' },
  { id: 'pw-gen-270', word: 'إِغْظَاذ', pattern: 'إِفْعَال' },
  // Form V masdar (تَفَعُّل)
  { id: 'pw-gen-271', word: 'تَثَظُّغ', pattern: 'تَفَعُّل' },
  { id: 'pw-gen-272', word: 'تَذَضُّث', pattern: 'تَفَعُّل' },
  // Form VI masdar (تَفَاعُل)
  { id: 'pw-gen-273', word: 'تَثَاظُغ', pattern: 'تَفَاعُل' },
  { id: 'pw-gen-274', word: 'تَذَاضُث', pattern: 'تَفَاعُل' },
  // Form VII masdar (اِنْفِعَال)
  { id: 'pw-gen-275', word: 'اِنْثِظَاغ', pattern: 'اِنْفِعَال' },
  { id: 'pw-gen-276', word: 'اِنْذِضَاث', pattern: 'اِنْفِعَال' },
  // Form VIII masdar (اِفْتِعَال)
  { id: 'pw-gen-277', word: 'اِثْتِظَاغ', pattern: 'اِفْتِعَال' },
  { id: 'pw-gen-278', word: 'اِذْتِضَاث', pattern: 'اِفْتِعَال' },
  // Form X masdar (اِسْتِفْعَال)
  { id: 'pw-gen-279', word: 'اِسْتِثْظَاغ', pattern: 'اِسْتِفْعَال' },
  { id: 'pw-gen-280', word: 'اِسْتِذْضَاث', pattern: 'اِسْتِفْعَال' },
];

/**
 * Pseudowords following active/passive participle patterns
 * Active participle (اسم الفاعل) and passive participle (اسم المفعول)
 * across Forms I-X
 */
export const pseudowordParticiples: Pseudoword[] = [
  // Form I active participle (فَاعِل)
  { id: 'pw-gen-281', word: 'ثَاظِغ', pattern: 'فَاعِل' },
  { id: 'pw-gen-282', word: 'ذَاضِث', pattern: 'فَاعِل' },
  { id: 'pw-gen-283', word: 'غَاثِظ', pattern: 'فَاعِل' },
  { id: 'pw-gen-284', word: 'ظَاذِغ', pattern: 'فَاعِل' },
  // Form I passive participle (مَفْعُول)
  { id: 'pw-gen-285', word: 'مَثْظُوغ', pattern: 'مَفْعُول' },
  { id: 'pw-gen-286', word: 'مَذْضُوث', pattern: 'مَفْعُول' },
  { id: 'pw-gen-287', word: 'مَغْثُوظ', pattern: 'مَفْعُول' },
  { id: 'pw-gen-288', word: 'مَظْذُوغ', pattern: 'مَفْعُول' },
  // Form II active participle (مُفَعِّل)
  { id: 'pw-gen-289', word: 'مُثَظِّغ', pattern: 'مُفَعِّل' },
  { id: 'pw-gen-290', word: 'مُذَضِّث', pattern: 'مُفَعِّل' },
  // Form II passive participle (مُفَعَّل)
  { id: 'pw-gen-291', word: 'مُثَظَّغ', pattern: 'مُفَعَّل' },
  { id: 'pw-gen-292', word: 'مُذَضَّث', pattern: 'مُفَعَّل' },
  // Form IV active participle (مُفْعِل)
  { id: 'pw-gen-293', word: 'مُثْظِغ', pattern: 'مُفْعِل' },
  { id: 'pw-gen-294', word: 'مُذْضِث', pattern: 'مُفْعِل' },
  // Form IV passive participle (مُفْعَل)
  { id: 'pw-gen-295', word: 'مُثْظَغ', pattern: 'مُفْعَل' },
  { id: 'pw-gen-296', word: 'مُذْضَث', pattern: 'مُفْعَل' },
  // Form V active participle (مُتَفَعِّل)
  { id: 'pw-gen-297', word: 'مُتَثَظِّغ', pattern: 'مُتَفَعِّل' },
  { id: 'pw-gen-298', word: 'مُتَذَضِّث', pattern: 'مُتَفَعِّل' },
  // Form VIII active participle (مُفْتَعِل)
  { id: 'pw-gen-299', word: 'مُثْتَظِغ', pattern: 'مُفْتَعِل' },
  // Form X active participle (مُسْتَفْعِل)
  { id: 'pw-gen-300', word: 'مُسْتَثْظِغ', pattern: 'مُسْتَفْعِل' },
];

/**
 * All pseudowords combined
 */
export const allPseudowords: Pseudoword[] = [
  ...pseudowordVerbs,
  ...pseudowordVerbsDerived,
  ...pseudowordNouns,
  ...pseudowordAdjectives,
  ...pseudowordMasdars,
  ...pseudowordParticiples,
];

/**
 * Get a random sample of pseudowords
 */
export function getRandomPseudowords(count: number): Pseudoword[] {
  const shuffled = [...allPseudowords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
