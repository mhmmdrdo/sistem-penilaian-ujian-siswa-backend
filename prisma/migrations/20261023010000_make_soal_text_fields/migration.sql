-- Allow long question content, answer keys, explanations, and answer options.
ALTER TABLE `soal`
    MODIFY `pertanyaan` TEXT NOT NULL,
    MODIFY `opsiA` TEXT NULL,
    MODIFY `opsiB` TEXT NULL,
    MODIFY `opsiC` TEXT NULL,
    MODIFY `opsiD` TEXT NULL,
    MODIFY `opsiE` TEXT NULL,
    MODIFY `jawabanBenar` TEXT NULL,
    MODIFY `pembahasan` TEXT NULL;
