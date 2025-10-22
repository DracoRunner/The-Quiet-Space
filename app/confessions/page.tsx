"use client";

import { useEffect } from "@preact-signals/safe-react/react";
import { useCallback, useRef, useState } from "react";
import ScrollAnimation from "##/components/common/ScrollAnimation";
import ConfessionCard from "##/components/confession/ConfessionCard";
import ConfessionForm from "##/components/confession/ConfessionForm";
import ConfessionModal from "##/components/confession/ConfessionModal";
import type { Confession } from "##/types/common";

const ConfessionPage: React.FC = () => {
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConfession, setSelectedConfession] =
    useState<Confession | null>(null);
  const messageTimeoutRef = useRef<number | null>(null);

  const showMessage = useCallback(
    (
      text: string,
      color: string,
      callback: (msg: { text: string; color: string } | null) => void
    ) => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      callback({ text, color });
      messageTimeoutRef.current = window.setTimeout(() => {
        callback(null);
      }, 4000);
    },
    []
  );

  const handleCardClick = (confession: Confession) => {
    setSelectedConfession(confession);
  };

  const handleCloseModal = () => {
    setSelectedConfession(null);
  };

  const handleNewConfession = (newConfession: Confession) => {
    setConfessions((prev) => [newConfession, ...prev]);
  };

  useEffect(() => {
    const fetchConfessions = async () => {
      try {
        const res = await fetch("/api/confessions");
        if (!res.ok) throw new Error("Failed to fetch confessions");
        const data = await res.json();

        const mapped: Confession[] = (data as Array<unknown>).map((item) => {
          const it = item as {
            id?: string;
            content?: string;
            createdAt?: string | number;
          };
          return {
            id: it.id ?? "",
            content: it.content ?? "",
            createdAt: new Date(it.createdAt ?? Date.now()),
          };
        });

        setConfessions(mapped);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConfessions();
  }, []);

  return (
    <>
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <header className="text-center mb-16">
            <h2 className="text-5xl font-extrabold text-[#2C3531] mb-4">
              The Quiet Corner
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              This is a space for quiet release. Share your feelings, fears, or
              reflections anonymously.{" "}
              <strong>No names, no tracking, just release.</strong>
            </p>
          </header>
        </ScrollAnimation>

        <ScrollAnimation delay={200}>
          <div className="max-w-4xl mx-auto">
            <ConfessionForm
              showMessage={showMessage}
              onNewConfession={handleNewConfession}
            />
          </div>
        </ScrollAnimation>

        <section>
          <ScrollAnimation delay={200}>
            <h3 className="text-3xl font-bold text-[#2C3531] mb-8 text-center">
              What the Community is Sharing
            </h3>
          </ScrollAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading && (
              <p className="text-center text-gray-500 col-span-1 lg:col-span-3">
                Loading shared thoughts...
              </p>
            )}
            {!isLoading && confessions.length === 0 && (
              <ScrollAnimation className="col-span-1 lg:col-span-3">
                <div className="text-center mt-12 p-8 bg-white rounded-xl text-gray-500">
                  Be the first to share! This corner is currently empty.
                </div>
              </ScrollAnimation>
            )}
            {confessions.map((c, index) => (
              <ScrollAnimation key={c.id} delay={(index % 3) * 100}>
                <ConfessionCard
                  confession={c}
                  onClick={() => handleCardClick(c)}
                />
              </ScrollAnimation>
            ))}
          </div>
        </section>
      </main>
      <ConfessionModal
        confession={selectedConfession}
        isOpen={!!selectedConfession}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ConfessionPage;
